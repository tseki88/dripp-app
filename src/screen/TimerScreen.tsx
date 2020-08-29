import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Vibration} from 'react-native';
import {
  ProgressBar,
  AppText,
  Button,
  TimeDisplay,
  StepList,
} from '../components';
import globalStyle from '../styles/globalStyle';
import useInterval from '../hooks/useInterval';

import {MainStackParamList} from '../utils/typeInterface';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import stepParse from '../utils/stepParse';

type TimerRouteProps = RouteProp<MainStackParamList, 'Timer'>;

interface TimerScreenProps {
  navigation?: NavigationProp<any, any>;
  route: TimerRouteProps;
}

// TODO: figure out ways to improve performance.
const TimerScreen = ({route}: TimerScreenProps) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [now, setNow] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [stepSum, setStepSum] = useState<number>(0);
  const [timerBreakpoint, setTimerBreakpoint] = useState(0);
  const [stepCount, setStepCount] = useState<Array<number>>([]);

  const params = route.params;
  const testRecipe = params.steps;

  useEffect(() => {
    setStepCount(testRecipe.map((e) => e.duration));
  }, [testRecipe]);

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
    isRunning ? 100 : null,
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

  const toggleRunning = () => {
    setNow(Date.now());
    Vibration.vibrate(100);
    setIsRunning((prev) => !prev);
  };

  const skipStep = () => {
    setTime(timerBreakpoint);
    stepTransition();
  };

  return (
    <View style={globalStyle.wrapper}>
      <View style={styles.displayContainer}>
        <View style={styles.displayProgress}>
          {/* <AppText>Total</AppText> */}
          <TimeDisplay time={time} />
          <ProgressBar numerator={stepSum - time} denominator={stepSum} />
        </View>
        <View style={styles.displayStepDetails}>
          <TimeDisplay time={time - timerBreakpoint} />
          <View>
            <View style={{height: 160}}>
              <ProgressBar
                numerator={timerBreakpoint + stepCount[stepIndex] - time}
                denominator={stepCount[stepIndex]}
              />
            </View>
            <AppText>Step: {stepIndex + 1}</AppText>
            <AppText>{stepParse(testRecipe[stepIndex].stepType)}</AppText>
            {testRecipe[stepIndex].notes !== '' ? (
              <AppText>{testRecipe[stepIndex].notes}</AppText>
            ) : null}
          </View>
          {stepIndex + 1 !== testRecipe.length ? (
            <StepList step={testRecipe[stepIndex + 1]} index={stepIndex + 1} />
          ) : null}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={!isRunning ? 'Start' : 'Pause'}
          pressHandler={toggleRunning}
        />
        <Button text={'Skip'} pressHandler={skipStep} />
        {/* Temporary Button to make it easier for testing timer */}
        <Button
          text={'Clear'}
          pressHandler={() => {
            setTime(stepSum);
            setStepIndex(0);
            setTimerBreakpoint(stepSum - stepCount[0]);
          }}
        />
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  displayContainer: {
    flex: 1,
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  displayProgress: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayStepDetails: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
