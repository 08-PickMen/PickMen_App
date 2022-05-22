
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import Start from './Components/Signup/Start'
import Purpose from './Components/Signup/purpose';
import SelectSchool_Mentee from './Components/Signup/Mentee/SelectSchool_Mentee';
import SelectSchool_Mento from './Components/Signup/Mentor/SelectSchool_Mentor';
import Certify_Mentee from './Components/Signup/Mentee/Certify_Mentee';
import Certify_Mento from './Components/Signup/Mentor/Certify_Mentor';
import Information from './Components/Signup/Mentee/Information_Mentee';
import HomeScreen from './Components/SignIn/HomePage/HomeScreen';
import GradeAccess_Mentee from './Components/Signup/Mentee/GradeAccess_Mentee';
import RegisterComplete from './Components/Signup/RegisterComplete';
import LoginPage from './Components/SignIn/LoginPage';
import Information_Mento from './Components/Signup/Mentor/Information_Mentor';
import Attention from './Components/Signup/Mentee/Attention';
import Major from './Components/Signup/Mentor/Major';

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
        <stack.Screen name="SelectSchool" component={SelectSchool_Mentee}/>
        <stack.Screen name='SelectSchool_Mento' component={SelectSchool_Mento}/>
        <stack.Screen name='Attention' component={Attention}/>
        <stack.Screen name='Major' component={Major}/>
        <stack.Screen name="Certify" component={Certify_Mentee}/>
        <stack.Screen name="Certify_Mento" component={Certify_Mento}/>
        <stack.Screen name="Information" component={Information}/>
        <stack.Screen name="Information_Mento" component={Information_Mento}/>
        <stack.Screen name="GradeAccess" component={GradeAccess_Mentee}/>
        <stack.Screen name="GradeAccess_Menti" component={GradeAccess_Mentee}/>
        <stack.Screen name="RegisterComplete" component={RegisterComplete} />
        <stack.Screen name="LoginPage" component={LoginPage}/>
        <stack.Screen name="HomeScreen" component={HomeScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};
}

export default App;
