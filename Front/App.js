/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import 'react-native-gesture-handler';
import GradeAccess from './Components/GradeAccess';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import Start from './Components/Start'
import Purpose from './Components/purpose';
import SelectSchool from './Components/SelectSchool';
import Certify from './Components/Certify';
import Information from './Components/Information';
import HomeScreen from './Components/HomeScreen';
const stack = createStackNavigator();

class App extends Component{
  render(){
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <stack.Screen name="HomeScreen" component={HomeScreen}/>
        <stack.Screen name="Start" component={Start}/>
        <stack.Screen name="Purpose" component={Purpose}/>
        <stack.Screen name="SelectSchool" component={SelectSchool}/>
        <stack.Screen name="Certify" component={Certify}/>
        <stack.Screen name="Information" component={Information}/>
        <stack.Screen name="GradeAccess" component={GradeAccess}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};
}

export default App;
