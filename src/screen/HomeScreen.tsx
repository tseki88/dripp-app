import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import globalStyle from '../styles/globalStyle';
import {AppText, RecipeList} from '../components';
import {NavigationProp} from '@react-navigation/native';
import sampleData from '.././sampleData.json';

type HomeScreenProps = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  // TODO: Figure out way to have user's recipe data array for access

  return (
    <View
      style={[
        globalStyle.wrapper,
        {backgroundColor: '#fcf3ec', position: 'relative'},
      ]}>
      <View style={styles.homeHeaderContainer}>
        <AppText style={globalStyle.fontHeaderOne}>Good Morning</AppText>
      </View>
      <View style={styles.homeMainContainer}>
        <AppText style={[globalStyle.fontHeaderTwo, {marginBottom: 10}]}>
          Recent Brews:
        </AppText>
        <RecipeList
          recipe={sampleData.recipe[0]}
          pressHandler={() =>
            navigation.navigate('RecipeView', sampleData.recipe[0])
          }
        />
        <RecipeList
          recipe={sampleData.recipe[1]}
          pressHandler={() =>
            navigation.navigate('RecipeView', sampleData.recipe[1])
          }
        />
      </View>
      <Pressable
        hitSlop={4}
        style={styles.newRecipeButton}
        onPress={() =>
          navigation.navigate('RecipeEdit', {
            steps: [],
            metric: {
              coffeeGrind: 0,
              coffeeWeight: 0,
              waterWeight: 0,
              waterTemp: 173,
              // Maybe not have a ratio value, and calculate on render
              ratio: 17.0,
            },
          })
        }>
        <AppText style={[globalStyle.fontHeaderOne, {color: '#ffffff'}]}>
          +
        </AppText>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeHeaderContainer: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#f4693e',
    aspectRatio: 5 / 2,
    padding: 14,
  },
  homeMainContainer: {
    flex: 1,
    position: 'relative',
    paddingTop: 20,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  newRecipeButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'brown',
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
