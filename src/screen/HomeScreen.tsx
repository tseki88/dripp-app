import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import globalStyle from '../styles/globalStyle';
import {AppText} from '../components';

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <View style={globalStyle.wrapper}>
      <View style={styles.homeHeaderContainer}>
        <AppText>Good Morning</AppText>
      </View>
      <View style={styles.homeMainContainer}>
        <AppText>This is the main</AppText>
        <Pressable
          onPress={() => navigation.navigate('Recipe')}
          style={{padding: 10, borderWidth: 1}}>
          <AppText>Recipe</AppText>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Timer')}
          style={{padding: 10, borderWidth: 1}}>
          <AppText>Timer</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeHeaderContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    aspectRatio: 2 / 1,
  },
  homeMainContainer: {
    flex: 1,
  },
});
