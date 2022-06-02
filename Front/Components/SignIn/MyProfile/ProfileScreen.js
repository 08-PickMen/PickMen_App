import React from 'react';
import 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyProfile from './MyProfile';
import EditProfile_Mentee from './EditProfile_Mentee';

const stack = createStackNavigator();
function ProfileScreen() {
    return (
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <stack.Screen name="MyProfile" component={MyProfile} />
                <stack.Screen name="EditProfile_Mentee" component={EditProfile_Mentee} />
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default ProfileScreen;