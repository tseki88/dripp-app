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
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import TimerContainer from './src/screen/timer/TimerContainer';
// import RecipeContainer from './src/screen/recipe/RecipeContainer';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      {/* <RecipeContainer /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#0000" />
      <SafeAreaView>
        {global.HermesInternal == null ? null : (
          <View>
            <Text>Engine: Hermes</Text>
          </View>
        )}
        <TimerContainer />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default App;
