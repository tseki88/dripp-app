import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StepInterface} from '../utils/typeInterface';
import TimeDisplay from './TimeDisplay';
import AppText from './AppText';
import globalStyle from '../styles/globalStyle';
import stepParse from '../utils/stepParse';

interface StepListProps {
  step: StepInterface;
  index: number;
}

const StepList = ({step, index}: StepListProps) => {
  const {stepType, duration, notes, waterAmount} = step;

  return (
    <View style={styles.listItem}>
      <View style={styles.stepNumber}>
        <AppText style={globalStyle.fontSmall}>{index + 1}</AppText>
      </View>
      <View style={styles.stepAppText}>
        <AppText>{stepParse(stepType)}</AppText>
        {notes !== '' ? (
          <AppText style={globalStyle.fontSmall}>{notes}</AppText>
        ) : null}
      </View>
      <View>
        <TimeDisplay time={duration} />
        {waterAmount !== 0 && (
          <AppText style={[globalStyle.fontSmall, {textAlign: 'right'}]}>
            {waterAmount + ' g'}
          </AppText>
        )}
      </View>
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
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  stepNumber: {
    borderWidth: 1,
    borderRadius: 21,
    width: 21,
    height: 21,
    marginRight: 5,
    alignItems: 'center',
  },
  stepAppText: {
    flex: 1,
  },
});
