import React, { useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet ,Item, StatusBar} from 'react-native';
import data from './PostList';
import 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Post from './Post';

function CreatePost({navigation}) {
    const Item = ({ item, onPress, style }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  const [selectedId, setSelectedId] = useState(null)
  
  const renderItem = ({ item }) => {
    //id가 selectedId라면 배경색상 변경
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
  
    return (
      <Item
        item={item}
        //아이템을 클릭하면 selectedId가 변경
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    )
  };
  async function loadBoard() {
    data.length = 0;
    await axios.get('http://10.0.2.2:8090/board/list?page=0&size=10')
    .then(response => {
        var count = parseInt(response.data.numberOfElements);
        count = count-1;
        for(count;count >=0; count--){
        data.push({
            id : response.data.content[count].id,
            title : response.data.content[count].title,
        },)
    }
    }).catch(error => {
        console.log(error)
    })
}
  return (

  <View style = {{ backgroundColor : '#fff', height : 2080}}>
        <View>
        <View style = {{flexDirection : 'row', marginTop : 10}}>
          <Text style = {styles.MainTitle}>게시글 목록</Text>
          <TouchableOpacity style = {styles.Button} onPress = {()=>{navigation.navigate('Post');}}>
            <Text style = {styles.ButtonText}>올리기</Text>
          </TouchableOpacity>
        </View>
        <View style ={{borderBottomColor : 'black', borderBottomWidth : .5,marginBottom : 20}}></View>
          <FlatList
          data = {data}
          renderItem={renderItem}
          keyExtractor = {item => item.id}
          extraData={selectedId}
          >
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
export default CreatePost;