import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Image , Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-navigation';
import Home from './Home';
import Mentor from '../MentorProfile/Mentor';
import Board from '../PostPage/Board';
import ProfileScreen from '../MyProfile/ProfileScreen';
import ViewChat from '../ChatPage/Chatboard';

// 전체 홈 화면 바텀 탭 Stack
const Tab = createBottomTabNavigator();

// 전체 홈 화면 바텀 탭 페이지
function HomeScreen({ navigation , route}) {
    return (
        <NavigationContainer independent={true} >
            <Tab.Navigator screenOptions={{
                headerShown: false,
                
                }}
                initialRouteName="Home"
                activeColor="#27BAFF"
                labeled = {true}
                >
                <Tab.Screen name="MentorProfile" component={Mentor} options={{
                    tabBarIcon: () => {
                        return (
                            <Image source={IconStyles.Profile.source} style={{ width: 30, height: 30 }} />
                        )
                    },
                    tabBarLabel: () => {
                        return (
                            <Text style={IconStyles.Profile.text}>멘토</Text>
                        )
                    },
                    unmountOnBlur: Platform.OS === 'ios' ? false : true,
                }}
                />
                <Tab.Screen name="Post" component={Board} options={{
                    tabBarIcon: () => {
                        return (
                            <Image source={IconStyles.Post.source} style={{ width: 25, height: 25, marginLeft : 5}} />
                        )
                    },
                    tabBarLabel: () => {
                        return (
                            <Text style={IconStyles.Post.text}>게시판</Text>
                        )
                    },
                    unmountOnBlur: Platform.OS === 'ios' ? false : true,
                }} />
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: () => {
                        return (
                            <Image source={IconStyles.Home.source} style={{ width: 25, height: 25 }} />
                        )
                    },
                    tabBarLabel: () => {
                        return (
                            <Text style={IconStyles.Home.text}>홈</Text>
                        )
                    },
                    unmountOnBlur: Platform.OS === 'ios' ? false : true,
                }} />
                <Tab.Screen name="Chat" component={ViewChat} options={{
                    tabBarIcon: () => {
                        return (
                            <Image source={IconStyles.Chat.source} style={{ width: 25, height: 25 }} />
                        )
                    },
                    tabBarLabel: () => {
                        return (
                            <Text style={IconStyles.Chat.text}>채팅</Text>
                        )
                    },
                    unmountOnBlur: Platform.OS === 'ios' ? false : true,
                }} />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                    tabBarIcon: () => {
                        return (
                            <Image source={IconStyles.MyProfile.source} style={{ width: 25, height: 25 }} />
                        )
                    },
                    tabBarLabel: () => {
                        return (
                            <Text style={IconStyles.MyProfile.text}>내 프로필</Text>
                        )
                    },
                    unmountOnBlur: Platform.OS === 'ios' ? false : true,
                }} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}
// 바텀 탭 아이콘 스타일
const IconStyles = StyleSheet.create({
    Home: {
        source: require('../../../icons/Home.png')
    },
    Profile: {
        source: require('../../../icons/Profile.png')
    },
    MyProfile: {
        source: require('../../../icons/MyProfile.png')
    },
    Post: {
        source: require('../../../icons/Post.png')
    },
    Chat: {
        source: require('../../../icons/Chat.png')
    }
});
const styles = StyleSheet.create({
    Introduce: {
        color: "black",
        textAlign: "center",
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 25,
    }
});

export default HomeScreen;