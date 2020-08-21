import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StepList from '../../components/StepList';

const StepContainer = () => {
  const sampleSteps = [
    {
      id: 0,
      stepType: 1,
      duration: 3000,
      targetWeight: 30,
    },
    {
      id: 1,
      stepType: 4,
      duration: 90000,
      notes: 'we wait',
    },
    {
      id: 2,
      stepType: 3,
      duration: 2800,
      targetWeight: 80,
    },
  ];

  return (
    <View>
      {sampleSteps.map((e, i) => {
        return <StepList key={e.id} step={e} index={i} />;
      })}
    </View>
  );
};

export default StepContainer;

const styles = StyleSheet.create({});
