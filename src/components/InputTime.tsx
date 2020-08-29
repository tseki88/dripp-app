import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import TimeDisplay from './TimeDisplay';

type InputTimeProps = {
  duration: number;
  setDuration: Function;
};

const InputTime = ({duration, setDuration}: InputTimeProps) => {
  // const [duration, setDuration] = useState<number>(0);
  const [timeInputActive, setTimeInputActive] = useState<boolean>(false);
  const [input, setInput] = useState<number>(0);

  const pressHandler = () => {
    setTimeInputActive(true);
  };

  const changeHandler = (e: any) => {
    let minutes = 0;
    let seconds = 0;
    // require data validation for "max value" or prevent input past certain value

    // if decimal or negative, no change is reflected
    // once 4 digits, can't enter more digits
    // once over 5960, defaults to 5959
    // if (e.isInteger() === false) {
    //   return;
    // } else
    if (e >= 10000) {
      return;
      // e = Math.floor(e / 10);
    } else if (e >= 5960) {
      e = 5959;
    }

    if (e >= 100) {
      minutes = Math.floor(e / 100);
      seconds = e - minutes * 100;
    } else {
      seconds = e;
    }

    let timeValue = minutes * 60000 + seconds * 1000;

    setInput(e);
    setDuration(timeValue);
  };

  return (
    <View>
      <Pressable onPress={() => pressHandler()}>
        <TimeDisplay time={duration} />
      </Pressable>
      {timeInputActive ? (
        <TextInput
          style={styles.inputBar}
          autoFocus={true}
          value={input.toString()}
          keyboardType="number-pad"
          caretHidden={true}
          onChangeText={(e) => changeHandler(e)}
          onBlur={() => setTimeInputActive(false)}
        />
      ) : null}
    </View>
  );
};

export default InputTime;

const styles = StyleSheet.create({
  inputBar: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
