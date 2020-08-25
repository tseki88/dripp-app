import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StepInterface} from '../utils/typeInterface';
import TimeDisplay from './TimeDisplay';
import AppText from './AppText';
import globalStyle from '../styles/globalStyle';

interface Expected {
  step: StepInterface;
  index: number;
}

const StepList = ({step, index}: Expected) => {
  const {stepType, duration, notes = null} = step;

  return (
    <View style={styles.listItem}>
      <View style={styles.stepNumber}>
        <AppText style={globalStyle.fontSmall}>{index + 1}</AppText>
      </View>
      <View style={styles.stepAppText}>
        <AppText>{stepType}</AppText>
        {notes ? (
          <AppText style={globalStyle.fontSmall}>{notes}</AppText>
        ) : null}
      </View>
      <TimeDisplay time={duration} />
    </View>
  );
};

export default StepList;

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#725034',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  stepNumber: {
    borderWidth: 1,
    borderRadius: 25,
    width: 20,
    height: 20,
    marginRight: 5,
    alignItems: 'center',
  },
  stepAppText: {
    flex: 1,
  },
});
