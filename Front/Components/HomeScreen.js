import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-navigation';
import Home from './Home';
import MentoProfile from './MentoProfile';
import Chat from './Chat';
import Board from './Board';
import Profile from './Profile';
import axios from 'axios';
import ViewChat from './Chatboard';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
    return(
        
            <NavigationContainer independent={true} >
            
            <Tab.Navigator screenOptions={{headerShown : false,
                tabBarStyle : {
                    backgroundColor : '#fff',
                },
                tabBarActiveTintColor : '#27BAFF',
                }}
                initialRouteName = 'Home'>
                <Tab.Screen name="MentoProfile" component={MentoProfile} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Profile.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    },
                    unmountOnBlur : Platform.OS === 'ios' ? false : true,
                }}/>
                <Tab.Screen name="Post" component={Board} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Post.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    },
                    unmountOnBlur : Platform.OS === 'ios' ? false : true,
                }}/>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Home.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    },
                    unmountOnBlur : Platform.OS === 'ios' ? false : true,
                }}/>
                <Tab.Screen name="Chat" component={ViewChat} options={{ 
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Chat.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    },
                    unmountOnBlur : Platform.OS === 'ios' ? false : true,
                }} />
                <Tab.Screen name="MyProfile" component={Profile} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.MyProfile.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    },
                    unmountOnBlur : Platform.OS === 'ios' ? false : true,
                }}/>
            </Tab.Navigator>
            </NavigationContainer>

    )
}

const IconStyles = StyleSheet.create({
    Home : {
        source : require('../icons/Home.png')
    },
    Profile : {
        source : require('../icons/Profile.png')
    },
    MyProfile : {
        source : require('../icons/MyProfile.png')
    },
    Post : {
        source : require('../icons/Post.png')
    },
    Chat : {
        source : require('../icons/Chat.png')
    }
});
const styles = StyleSheet.create({
    Introduce:{
        color : "black",
        textAlign : "center",
        marginRight : 'auto',
        marginTop : 10,
        marginBottom : 10,
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight : 'bold',
        fontSize : 25,
    }
});

export default HomeScreen;