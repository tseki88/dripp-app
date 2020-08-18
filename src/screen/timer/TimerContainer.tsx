import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Timer from './Timer';

const TimerContainer = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [now, setNow] = useState<number>(0);

  const startTimer = () => {
    setNow(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <View>
      <Timer isRunning={isRunning} now={now} setNow={setNow} />
      <TouchableOpacity style={styles.button} onPress={() => startTimer()}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => stopTimer()}>
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerContainer;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 80,
    borderWidth: 2,
  },
});
