import React ,{useEffect}from 'react';
import { Platform, StyleSheet } from 'react-native';
import {Image, BackHandler} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import 'react-navigation';
import Home from './Home';
import Mentor from '../MentorProfile/Mentor';
import Board from '../PostPage/Board';
import Profile from '../MyProfile/Profile';
import ViewChat from '../ChatPage/Chatboard';

// 전체 홈 화면 바텀 탭 Stack
const Tab = createBottomTabNavigator();

// 전체 홈 화면 바텀 탭 페이지
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
                <Tab.Screen name="MentorProfile" component={Mentor} options={{
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
// 바텀 탭 아이콘 스타일
const IconStyles = StyleSheet.create({
    Home : {
        source : require('../../../icons/Home.png')
    },
    Profile : {
        source : require('../../../icons/Profile.png')
    },
    MyProfile : {
        source : require('../../../icons/MyProfile.png')
    },
    Post : {
        source : require('../../../icons/Post.png')
    },
    Chat : {
        source : require('../../../icons/Chat.png')
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