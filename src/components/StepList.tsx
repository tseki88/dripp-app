import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StepInterface} from '../screen/recipe/recipeInterface';

interface Expected {
  step: StepInterface;
  index: number;
}

const StepList = ({step, index}: Expected) => {
  const {stepType, duration, notes = null} = step;

  return (
    <View>
      <Text>{index}</Text>
      <Text>{stepType}</Text>
      <Text>{duration}</Text>
    </View>
  );
};

export default StepList;

const styles = StyleSheet.create({});
