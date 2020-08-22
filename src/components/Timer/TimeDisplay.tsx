import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface TimeInterface {
  time: number;
}

const TimeDisplay = ({time}: TimeInterface) => {
  if (time < 0) {
    time = 0;
  }
  // const tenMilliseconds = Math.floor(time / 100) % 10;
  const seconds = Math.ceil(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {minutes < 10 ? '0' + minutes : minutes}
        <Text> : </Text>
        {seconds < 10 ? '0' + seconds : seconds}
        {/* <Text> . </Text> */}
        {/* {tenMilliseconds} */}
      </Text>
    </View>
  );
};

export default TimeDisplay;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
