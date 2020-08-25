import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {RecipeScreen, TimerScreen, HomeScreen, AddStepScreen} from '../screen';
import {MainStackParamList} from '../utils/typeInterface';

// Switch this back to non-native stack navigator.. try to see if keyboard dismiss and back button work

enableScreens();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Timer"
        component={TimerScreen}
        options={{title: 'Timer'}}
      />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="AddStep" component={AddStepScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
