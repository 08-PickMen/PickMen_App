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
import SelectSchool_Mento from './Components/SelectSchool_Mento';
import Certify from './Components/Certify';
import Certify_Mento from './Components/Certify_Mento';
import Information from './Components/Information';
import HomeScreen from './Components/HomeScreen';
import Testpage from './Components/Test'
import GradeAccess_Menti from './Components/GradeAccess_Menti';
import RegisterComplete from './Components/RegisterComplete';
import LoginPage from './Components/LoginPage';
const stack = createStackNavigator();

class App extends Component{
  render(){
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <stack.Screen name="Start" component={Start}/>
        <stack.Screen name="Purpose" component={Purpose}/>
        <stack.Screen name="SelectSchool" component={SelectSchool}/>
        <stack.Screen name='SelectSchool_Mento' component={SelectSchool_Mento}/>
        <stack.Screen name="Certify" component={Certify}/>
        <stack.Screen name="Certify_Mento" component={Certify_Mento}/>
        <stack.Screen name="Information" component={Information}/>
        <stack.Screen name="GradeAccess" component={GradeAccess}/>
        <stack.Screen name="GradeAccess_Menti" component={GradeAccess_Menti}/>
        <stack.Screen name="HomeScreen" component={HomeScreen}/>
        <stack.Screen name="Testpage" component={Testpage}/>
        <stack.Screen name="ResgisterComplete" component={RegisterComplete} />
        <stack.Screen name="LoginPage" component={LoginPage}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};
}

export default App;
