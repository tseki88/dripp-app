import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { RecipeInterface } from '../utils/typeInterface';
import AppText from './AppText';
import grindParse from '../utils/grindParse';
import globalStyle from '../styles/globalStyle';

type RecipeListProps = {
  pressHandler: Function;
  recipe: RecipeInterface;
};

const RecipeList = ({recipe, pressHandler}:RecipeListProps) => {
  
  const {name, metric} = recipe;
  
  return (
    <Pressable style={styles.recipeList} onPress={() => pressHandler()}>
      <AppText>{name}</AppText>
      <View style={styles.recipeOverview}>
        <AppText style={[globalStyle.fontSmall, {marginRight: 10}]}>Ratio: {metric.ratio}</AppText>
        <AppText style={globalStyle.fontSmall}>{grindParse(metric.coffeeGrind)}</AppText>
      </View>
    </Pressable>
  )
}

export default RecipeList

const styles = StyleSheet.create({
  recipeList: {
    paddingVertical: 8,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  recipeOverview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  }
})
