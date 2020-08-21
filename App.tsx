/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  // ScrollView,
  // View,
  // Text,
  StatusBar,
} from 'react-native';

import TimerScreen from './src/screen/TimerScreen';
// import RecipeContainer from './src/screen/recipe/RecipeContainer';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#0000" />
      <SafeAreaView style={styles.safeView}>
        <TimerScreen />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});

export default App;
