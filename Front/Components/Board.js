import React, { useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet ,Item, StatusBar} from 'react-native';
import data from './PostList';
import 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Post from './Post';
import PostList from './PostList';
import ViewPost from './ViewPost';
import EditPost from './EditPost';

const stack = createStackNavigator();

function Board() {
    return (
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{
                headerShown : false 
            }}>
                <stack.Screen name="PostPage" component={PostList}/>
                <stack.Screen name="Post" component={Post}/>
                <stack.Screen name="ViewPost" component={ViewPost}/>
                <stack.Screen name="EditPost" component={EditPost}/>

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
  
export default Board;