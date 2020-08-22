import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import sampleData from '.././sampleData.json';
import {StepList, AppText} from '../components';
import globalStyle from '../styles/globalStyle';
// import { RecipeInterface } from '../utils/recipeInterface';

const RecipeScreen = ({sample = sampleData.recipe[0]}) => {
  const {brewType, name, metric, steps} = sample;

  return (
    <View style={globalStyle.wrapper}>
      <View style={styles.metricsContainer}>
        <View style={{display: 'flex', alignItems:'center'}}>
          <AppText>{brewType}</AppText>
          <AppText>{name}</AppText>
        </View>
        <View style={styles.spaceBetween}>
          <View>
            <AppText>Grind:</AppText>
            <AppText>{metric.coffeeGrind}</AppText>
          </View>
          <View>
            <AppText>Water Temp:</AppText>
            <AppText>{metric.waterTemp}</AppText>
          </View>
        </View>
        <View style={styles.spaceBetween}>
          <View>
            <AppText>Ratio:</AppText>
            <AppText>1 : {metric.ratio}</AppText>
          </View>
          <View>
            <AppText>Coffee:</AppText>
            <AppText>{metric.coffeeWeight} g</AppText>
          </View>
          <View>
            <AppText>Water:</AppText>
            <AppText>{metric.waterWeight} g</AppText>
          </View>
        </View>
      </View>
      <View style={styles.stepListContainer}>
        <FlatList
          data={steps}
          renderItem={({item, index}) => {
            return <StepList step={item} index={index} />;
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricsContainer: {
    flex: 1,
  },
  stepListContainer: {
    flex: 2,
  },
});
