import React from 'react';
import { StyleSheet} from 'react-native';
import 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MentorProfileDetail from './MentorProfileDetail';
import MentorProfile from './MentorProfile';

const stack = createStackNavigator();

function Mentor() {
    return (
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{
                headerShown : false 
            }} initialRouteName = "MentorPage">
                <stack.Screen name="MentorProfilePage" component={MentorProfile}/>
                <stack.Screen name="MentorProfileDetailPage" component={MentorProfileDetail}/>                

            </stack.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
  MainTitle : {
    color : "#27BAFF",
    fontSize : 17,
    fontFamily : 'Jalnan',
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 10,
  },
    item: {
      padding: 15,
      borderRadius : 5,
      width : '97%',
      marginLeft : 'auto',
      marginRight : 'auto',
      marginBottom : 5,
      borderColor : "black",
      borderWidth : 1,
    },
    title: {
      fontSize: 18,
      fontFamily : 'NanumSquareRoundB',
    },
    Button : {
      width : 80,
      height : 40,
      backgroundColor : "#27BAFF",
      borderColor : 'black',
      borderRadius : 10,
      marginLeft : 'auto',
      marginRight : 10,
  },
  ButtonText: {
      color : "white",
      marginTop : 10,
      marginLeft : 'auto',
      marginRight : 'auto',
      marginBottom : 10,
      fontSize : 15,
      fontFamily : 'Jalnan',

  },
  });
  
export default Mentor;