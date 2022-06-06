
import React, { Component, useEffect} from 'react';
import 'react-native-gesture-handler';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import Start from './Components/Signup/Start'
import Purpose from './Components/Signup/purpose';
import SelectSchool_Mentee from './Components/Signup/Mentee/SelectSchool_Mentee';
import SelectSchool_Mentor from './Components/Signup/Mentor/SelectSchool_Mentor';
import Introduce_Mentor from './Components/Signup/Mentor/Introduce_Mentor';
import Certify_Mentee from './Components/Signup/Mentee/Certify_Mentee';
import Certify_Mentor from './Components/Signup/Mentor/Certify_Mentor';
import Information_Mentee from './Components/Signup/Mentee/Information_Mentee';
import HomeScreen from './Components/SignIn/HomePage/HomeScreen';
import GradeAccess_Mentee from './Components/Signup/Mentee/GradeAccess_Mentee';
import GradeAccess_Mentor from './Components/Signup/Mentor/GradeAccess_Mentor';
import RegisterComplete from './Components/Signup/RegisterComplete';
import LoginPage from './Components/SignIn/LoginPage';
import Information_Mentor from './Components/Signup/Mentor/Information_Mentor';
import Attention from './Components/Signup/Mentee/Attention';
import Major from './Components/Signup/Mentor/Major';
import Map from './Components/Signup/Mentor/Map';
import Map_mentee from './Components/Signup/Mentee/Map';
const stack = createStackNavigator();

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      position : {
        coords : {
          latitude : 0,
          longitute : 0,
        }
      }
    }
  }
  componentDidMount(){
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('FCM Message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }
  render(){
  
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <stack.Screen name="Start" component={Start}/>
        <stack.Screen name="Purpose" component={Purpose}/>
        <stack.Screen name="SelectSchool_Mentee" component={SelectSchool_Mentee}/>
        <stack.Screen name='SelectSchool_Mentor' component={SelectSchool_Mentor}/>
        <stack.Screen name='Attention' component={Attention}/>
        <stack.Screen name='Major' component={Major}/>
        <stack.Screen name='Introduce_Mentor' component={Introduce_Mentor}/>
        <stack.Screen name="Certify_Mentee" component={Certify_Mentee}/>
        <stack.Screen name="Certify_Mentor" component={Certify_Mentor}/>
        <stack.Screen name="Information_Mentee" component={Information_Mentee}/>
        <stack.Screen name="Information_Mentor" component={Information_Mentor}/>
        <stack.Screen name="GradeAccess_Mentor" component={GradeAccess_Mentor}/>
        <stack.Screen name="GradeAccess_Mentee" component={GradeAccess_Mentee}/>
        <stack.Screen name="RegisterComplete" component={RegisterComplete} />
        <stack.Screen name="LoginPage" component={LoginPage}/>
        <stack.Screen name="HomeScreen" component={HomeScreen}/>
        <stack.Screen name="Map" component={Map}/>
        <stack.Screen name="Map_mentee" component={Map_mentee}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};
}

export default App;
