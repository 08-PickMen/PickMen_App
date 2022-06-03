import React from 'react';
import 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyProfile from './MyProfile';
import EditProfile_Mentee from './EditProfile_Mentee';
import EditProfile_Mentor from './EditProfile_Mentor';

const stack = createStackNavigator();
function ProfileScreen() {
    return (
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <stack.Screen name="MyProfile" component={MyProfile} />
                <stack.Screen name="EditProfile_Mentee" component={EditProfile_Mentee} />
                <stack.Screen name="EditProfile_Mentor" component={EditProfile_Mentor} />
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default ProfileScreen;