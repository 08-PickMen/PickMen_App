import React from 'react';
import { StyleSheet } from 'react-native';
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-navigation';
import Home from './Home';
import MentoProfile from './MentoProfile';
import Post from './Post';
import Chat from './Chat';
import PostList from './PostList';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return(
        
            <NavigationContainer independent={1} >

            <Tab.Navigator screenOptions={{headerShown : false,
                tabBarStyle : {
                    backgroundColor : '#fff',
                },
                tabBarActiveTintColor : '#27BAFF',
                
                }}>
                <Tab.Screen name="MentoProfile" component={MentoProfile} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Profile.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    }
                }}/>
                <Tab.Screen name="Post" component={Post} options={{
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Post.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    },
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
                    }
                }}/>
                <Tab.Screen name="Chat" component={Chat} options={{ 
                    tabBarIcon: () => {
                        return(
                        <Image source={IconStyles.Chat.source} style={{width :30, height : 30}}/>
                        )
                    },
                    tabBarLabelStyle : {
                        fontSize : 10,
                        fontFamily : 'Jalnan'
                    }
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