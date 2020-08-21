import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {RecipeInterface} from './recipeInterface';

const RecipeContainer = () => {
  const sample: RecipeInterface = {
    id: Date.now(),
    brewType: 3,
    name: 'test',
    metric: {
      coffeeGrind: 18,
      coffeeWeight: 12,
      waterTemp: 95,
      waterWeight: 250,
      ratio: 13.9,
    },
    steps: [
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
    ],
  };

  return (
    <View>
      <Text>{sample.brewType}</Text>
      <Text>{sample.name}</Text>
      <View style={styles.spaceBetween}>
        <View>
          <Text>Grind:</Text>
          <Text>{sample.metric.coffeeGrind}</Text>
        </View>
        <View>
          <Text>Water Temp:</Text>
          <Text>{sample.metric.waterTemp}</Text>
        </View>
      </View>
      <View style={styles.spaceBetween}>
        <View>
          <Text>Ratio:</Text>
          <Text>1 : {sample.metric.ratio}</Text>
        </View>
        <View>
          <Text>Coffee:</Text>
          <Text>{sample.metric.coffeeWeight} g</Text>
        </View>
        <View>
          <Text>Water:</Text>
          <Text>{sample.metric.waterWeight} g</Text>
        </View>
      </View>
    </View>
  );
};

export default RecipeContainer;

const styles = StyleSheet.create({
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
