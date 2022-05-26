import React from 'react';
import 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Chat from './Chat';
import ChatList from './ChatList';

const stack = createStackNavigator();

function ViewChat() {
    return (
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{
                headerShown : false 
            }}>
                <stack.Screen name="ChatPage" component={ChatList}/>
                <stack.Screen name="Chat" component={Chat}/>
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default ViewChat;