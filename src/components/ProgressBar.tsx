import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ProgressProps {
  numerator: number;
  denominator: number;
}

// To use animated api for progress bar animation
const ProgressBar = ({numerator, denominator}: ProgressProps) => {
  return (
    <View style={styles.progressBar}>
      <View
        style={[
          styles.progressFill,
          {height: `${(numerator / denominator) * 100}%`},
        ]}
      />
    </View>
  );
};

export default ProgressBar;

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
