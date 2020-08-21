import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import globalStyle from '../styles/globalStyle';
import TimerProgressBar from '../components/TimerProgressBar';
import useInterval from '../hooks/useInterval';
import TimerDisplay from '../components/TimeDisplay';

const TimerScreen = () => {
  // this array is temp data
  const [stepCount, setStepCount] = useState<Array<number>>([
    3000,
    6000,
    4000,
    10000,
  ]);

  // useEffect(() => {
  //   const steps = [
  //     {
  //       id: 0,
  //       stepType: 1,
  //       duration: 3000,
  //       targetWeight: 30,
  //     },
  //     {
  //       id: 1,
  //       stepType: 4,
  //       duration: 90000,
  //       notes: 'we wait',
  //     },
  //     {
  //       id: 2,
  //       stepType: 3,
  //       duration: 2800,
  //       targetWeight: 80,
  //     },
  //   ];

  //   const durations = steps.map((e) => e.duration);
  //   setStepCount(durations);
  // }, []);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [now, setNow] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);
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

  const stepTransition = () => {
    let indexValue = stepIndex;
    if (stepIndex < stepCount.length - 1) {
      indexValue = stepIndex + 1;
      setTimerBreakpoint((prev) => prev - stepCount[indexValue]);
      Vibration.vibrate(200);
    }
    setStepIndex(indexValue);
  };

  const timeCheck = () => {
    if (time <= 0) {
      setIsRunning(false);
      setTime(0);
      Vibration.vibrate([0, 300, 1000, 300]);
    } else if (time <= timerBreakpoint) {
      stepTransition();
    }
  };

  const startTimer = () => {
    setNow(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const skipStep = () => {
    setTime(timerBreakpoint);
    stepTransition();
  };

  return (
    <View style={globalStyle.wrapper}>
      <View style={styles.displayContainer}>
        <View style={styles.displayProgress}>
          <TimerProgressBar
            numerator={stepSum - time}
            denominator={stepSum}
            stepIndex={stepIndex}
          />
        </View>
        <View style={styles.displayStepDetails}>
          <Text>Total</Text>
          <TimerDisplay time={time} />
          <Text>current</Text>
          <TimerDisplay time={time - timerBreakpoint} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => startTimer()}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => stopTimer()}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => skipStep()}>
          <Text>Skip</Text>
        </TouchableOpacity>
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
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  displayContainer: {
    flex: 5,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  displayProgress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayStepDetails: {
    flex: 4,
  },
  button: {
    width: '24%',
    height: 50,
    borderWidth: 1,
  },
});
