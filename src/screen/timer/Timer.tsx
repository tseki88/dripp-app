import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useInterval from '../../hooks/useInterval';

interface TimerInterface {
  isRunning: boolean;
  now: number;
  setNow: Function;
}

const Timer = ({isRunning, now, setNow}: TimerInterface) => {
  const [time, setTime] = useState<number>(0);

  useInterval(
    () => {
      const newDate: number = Date.now();
      const timeDiff = newDate - now;
      setNow(Date.now());
      setTime((prev) => {
        return prev + timeDiff;
      });
    },
    isRunning ? 40 : null,
  );

  return (
    <View>
      <Text style={styles.timeDisplay}>{time}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setTime(0)}>
        <Text>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timeDisplay: {
    fontSize: 28,
  },
  button: {
    width: 200,
    height: 80,
    borderWidth: 2,
  },
});
