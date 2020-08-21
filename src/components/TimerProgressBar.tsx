import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ProgressProps {
  numerator: number;
  denominator: number;
  stepIndex: number;
}

const TimerProgressBar = ({
  numerator,
  denominator,
  stepIndex,
}: ProgressProps) => {
  return (
    <View style={styles.progressBar}>
      <Text>{stepIndex + 1}</Text>
      <View
        style={[
          styles.progressFill,
          {height: `${(numerator / denominator) * 100}%`},
        ]}
      />
    </View>
  );
};

export default TimerProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    position: 'relative',
    height: '98%',
    width: 20,
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
  },
});
