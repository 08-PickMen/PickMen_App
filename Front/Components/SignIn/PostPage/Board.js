import React from 'react';
import 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Post from './Post';
import PostList from './PostList';
import ViewPost from './ViewPost';
import EditPost from './EditPost';
import MentorProfileDetailFromReply from './MentorProfileFromReply';
// Post 전체 페이지 Stack
const stack = createStackNavigator();
// Post 전체 페이지
const Board = () => {
  return (
    <NavigationContainer independent={true}>
      <stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="PostPage">
        <stack.Screen name="PostPage" component={PostList} />
        <stack.Screen name="Post" component={Post} />
        <stack.Screen name="ViewPost" component={ViewPost} />
        <stack.Screen name="EditPost" component={EditPost} />
        <stack.Screen name="MentorProfileDetailFromReply" component={MentorProfileDetailFromReply} />
      </stack.Navigator>
    </NavigationContainer>
  )
}
export default Board;