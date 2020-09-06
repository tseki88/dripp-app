import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {
  RecipeViewScreen,
  TimerScreen,
  HomeScreen,
  StepEditScreen,
  RecipeEditScreen,
} from '../screen';
import {MainStackParamList} from '../utils/typeInterface';

// Switch this back to non-native stack navigator.. try to see if keyboard dismiss and back button work

enableScreens();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerHideShadow: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Timer"
        component={TimerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeView"
        component={RecipeViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeEdit"
        component={RecipeEditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="StepEdit" component={StepEditScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
