import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import useInterval from '../../hooks/useInterval';
import TimerDisplay from './TimerDisplay';

interface TimerInterface {
  isRunning: boolean;
  now: number;
  setNow: Function;
  setIsRunning: Function;
}

const deviceHeight = Dimensions.get('window').height;

const Timer = ({isRunning, now, setNow, setIsRunning}: TimerInterface) => {
  const [stepCount, setStepCount] = useState<Array<number>>([
    3000,
    6000,
    4000,
    10000,
  ]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [stepSum, setStepSum] = useState<number>(0);
  const [timerBreakpoint, setTimerBreakpoint] = useState(0);

  useEffect(() => {
    const sumof = stepCount.reduce((a, b) => {
      return a + b;
    }, 0);

    setStepSum(sumof);
    setStepIndex(0);
    setTime(sumof);
    setTimerBreakpoint(sumof - stepCount[0]);
  }, [stepCount]);

  useInterval(
    () => {
      const newDate: number = Date.now();
      const timeDiff = newDate - now;
      setNow(Date.now());
      setTime((prev) => {
        return prev - timeDiff;
      });
      timeCheck();
    },
    isRunning ? 60 : null,
  );

  const timeCheck = () => {
    if (time <= 0) {
      triggerAlert();
      setIsRunning(false);
      setTime(0);
    } else if (time <= timerBreakpoint) {
      let indexValue = stepIndex;
      if (stepIndex < stepCount.length - 1) {
        indexValue = stepIndex + 1;
        setTimerBreakpoint((prev) => prev - stepCount[indexValue]);
      }
      setStepIndex(indexValue);
    }
  };

  const triggerAlert = () => {
    Alert.alert('Finished!', undefined, [{text: 'Ok'}]);
  };

  return (
    <ScrollView>
      <Text>Values</Text>
      <Text>
        [
        {stepCount.map((e, i) => (
          <Text key={i}> {e} </Text>
        ))}
        ]
      </Text>
      <Text> breakpoint: {timerBreakpoint}</Text>
      <View style={styles.temp}>
        <View style={{flexGrow: 1}}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    (1 - (time - timerBreakpoint) / stepCount[stepIndex]) * 100
                  }%`,
                },
              ]}
            />
          </View>
          <TimerDisplay time={time - timerBreakpoint} />
        </View>
        {/* <Text style={styles.timeDisplay}>{time}</Text> */}
        <View>
          <TimerDisplay time={time} />
          <View style={[styles.progressBar, styles.progressBarVertical]}>
            <View
              style={[
                styles.progressFill,
                {height: `${((stepSum - time) / stepSum) * 100}%`},
              ]}
            />
          </View>
        </View>
      </View>
      {/* Temporary Button to make it easier for testing timer */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setTime(stepSum);
          setStepIndex(0);
          setTimerBreakpoint(stepSum - stepCount[0]);
        }}>
        <Text>Clear</Text>
      </TouchableOpacity>
    </ScrollView>
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
  progressBar: {
    position: 'relative',
    height: 20,
    width: '100%',
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarVertical: {
    height: deviceHeight - 350,
    width: 20,
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
  },
  temp: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
});
