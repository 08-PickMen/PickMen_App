/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {Node} from 'react';
import 'react-native-gesture-handler';
import Start from './Components/Start';
import Purpose from './Components/purpose';
import SelectSchool from './Components/SelectSchool';
import Certify from './Components/Certify';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import Information from './Components/Information';

const stack = createStackNavigator();

class App extends React.Component{
  render(){
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <stack.Screen name="Login" component={Information} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
}

export default App;
