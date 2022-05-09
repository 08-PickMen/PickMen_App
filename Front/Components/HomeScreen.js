import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-navigation';
import Home from './Home';
import Setting from './Setting';
import MentoProfile from './MentoProfile';
import Post from './Post';
import Chat from './Chat';
import Profile from './Profile';
const Tab = createBottomTabNavigator();

function HomeScreen(route, navigation) {
    return(
            <NavigationContainer independent={true} >
            <Tab.Navigator screenOptions={{headerShown : false}}>
                <Tab.Screen name="MentoProfile" component={MentoProfile} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Profile.source} style={{width :30, height : 30}}/>
                        )
                    }
                }}/>
                <Tab.Screen name="Post" component={Post} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Post.source} style={{width :30, height : 30}}/>
                        )
                    }
                }}/>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Home.source} style={{width :30, height : 30}}/>
                        )
                    }
                }}/>
                <Tab.Screen name="Chat" component={Chat} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Chat.source} style={{width :30, height : 30}}/>
                        )
                    }
                }}/>
                <Tab.Screen name="MyProfile" component={Profile} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.MyProfile.source} style={{width :30, height : 30}}/>
                        )
                    }
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