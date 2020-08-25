import React from 'react';
import {Text} from 'react-native';
import AppText from './AppText';

interface TimeInterface {
  time: number;
  style?: object;
}

const TimeDisplay = ({time, style = {}}: TimeInterface) => {
  if (time < 0) {
    time = 0;
  }
  // const tenMilliseconds = Math.floor(time / 100) % 10;
  const seconds = Math.ceil(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;

  return (
    <AppText style={style}>
      {minutes < 10 ? '0' + minutes : minutes}
      <Text> : </Text>
      {seconds < 10 ? '0' + seconds : seconds}
      {/* <Text> . </Text> */}
      {/* {tenMilliseconds} */}
    </AppText>
  );
};

export default TimeDisplay;
