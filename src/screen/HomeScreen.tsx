import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import globalStyle from '../styles/globalStyle';
import {AppText} from '../components';
import {NavigationProp} from '@react-navigation/native';
import sampleData from '.././sampleData.json';

type HomeScreenProps = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <View style={globalStyle.wrapper}>
      <View style={styles.homeHeaderContainer}>
        <AppText style={globalStyle.fontHeaderOne}>Good Morning</AppText>
      </View>
      <View style={styles.homeMainContainer}>
        <AppText style={globalStyle.fontHeaderTwo}>Recent Brews:</AppText>
        <Pressable
          onPress={() => navigation.navigate('Recipe', sampleData.recipe[0])}
          style={{padding: 10, borderWidth: 1}}>
          <AppText>Recipe 1</AppText>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Recipe', sampleData.recipe[1])}
          style={{padding: 10, borderWidth: 1}}>
          <AppText>Recipe 2</AppText>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('AddStep')}
          style={{padding: 10, borderWidth: 1}}>
          <AppText>Add Step</AppText>
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.navigate('Recipe')}
          style={styles.circleButton}>
          <AppText>+</AppText>
        </Pressable> */}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeHeaderContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#d5eef8',
    aspectRatio: 2 / 1,
  },
  homeMainContainer: {
    flex: 1,
    position: 'relative',
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderWidth: 1,
  },
});
