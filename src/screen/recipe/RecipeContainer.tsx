import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// import {RecipeInterface} from './recipeInterface';

const RecipeContainer = () => {
  return (
    <View>
      <Text>brew type</Text>
      <Text>Brew Setting Name</Text>
      <View style={styles.spaceBetween}>
        <View>
          <Text>Grind:</Text>
          <Text>Medium Coarse</Text>
        </View>
        <View>
          <Text>Water Temp:</Text>
          <Text>94 C</Text>
        </View>
      </View>
      <View style={styles.spaceBetween}>
        <View>
          <Text>Ratio:</Text>
          <Text>1 : 14</Text>
        </View>
        <View>
          <Text>Coffee:</Text>
          <Text>18 g</Text>
        </View>
        <View>
          <Text>Water:</Text>
          <Text>260 g</Text>
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
