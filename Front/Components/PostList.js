import React, { useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet ,Item, StatusBar, RefreshControl} from 'react-native';
import data from './PostData';
import {NavigationActions,StackActions} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import Post from './Post';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import newPostData from './newPostData';


function PostList({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

    const Item = ({ item, onPress, style }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  const [selectedId, setSelectedId] = useState(null)
  
  function loadPost(id) {
    var count = data.length;
    for(count= count-1; count >= 0; count--){
        if(data[count].id == id){
            newPostData.push(data[count],);
            break;
        }
    }
    navigation.navigate('ViewPost');
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
  
    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id); loadPost(item.id)}}
        style={{ backgroundColor }}
      />
    )
  };

  return (

  <View style = {{flex : 10, backgroundColor : '#fff', height : 2080}}>
        <View>
        <View style = {{flexDirection : 'row', marginTop : 10}}>
          <Text style = {styles.MainTitle}>게시글 목록</Text>
          <TouchableOpacity style = {styles.Button} onPress = {()=>{navigation.reset({routes : [{name : 'Post'}]})}}>
            <Text style = {styles.ButtonText}>올리기</Text>
          </TouchableOpacity>
        </View>
        <View style ={{flex : 1, borderBottomColor : 'black', borderBottomWidth : .5,marginBottom : 20}}></View>
          <FlatList
          data = {data}
          renderItem={renderItem}
          keyExtractor = {item => item.id}
          windowSize = {99}
          onEndReachedThreshold={0.6}
          contentContainerStyle = {{flex : 1}}
          refreshControl={
            <RefreshControl
            refreshing = {refreshing}
            onRefresh = {onRefresh}>
            </RefreshControl>
          }>  
          </FlatList>
          </View>
      </View>
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
export default PostList;