import React, { useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet ,Image, RefreshControl,ActivityIndicator } from 'react-native';
import {Searchbar} from 'react-native-paper';
import filter from 'lodash.filter';
import postdata from './PostData';
import newPostData from './newPostData';
import {Card, TextInput} from 'react-native-paper'
import writeIcon from '../icons/writing.png';
import {CommonActions} from '@react-navigation/native';


function PostList({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);
  var [data, setData] = React.useState([]);
  data = postdata;
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onChangeSearch = query => setQuery(query);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  async function updateCount(item,id) {
    await axios.post('http://10.0.2.2:8090/post/upcountPost?id='+id).then(response => {
  })
  }
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
          <Card style = {styles.cards}>
            <Card.Title title={item.title}/>
            <Card.Content style = {{flexDirection : 'row'}}>
              <Text>작성자 : {item.nickname}</Text>
              <Text style={{marginLeft : 'auto'}}>조회 수 {item.count}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

    );
  const [selectedId, setSelectedId] = useState(null)
  
  function loadPost(item, id) {
    var count = data.length;
    for(count= count-1; count >= 0; count--){
        if(data[count].id == id){
            newPostData.push(data[count],);
            break;
        }
    }
  }
  function datacountUp(id) {
    var count = data.length;
    for(count= count-1; count >= 0; count--){
      if(data[count].id == id){
          data[count].count = data[count].count + 1;
          break;
      }
  }
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id); loadPost(item, item.id); updateCount(item, item.id); datacountUp(item.id); navigation.dispatch(CommonActions.reset({
          index : 0,
          routes : [{name : 'PostPage'},{name : 'ViewPost'},]
      }))}}
        style={{ backgroundColor }}
      />
    )
  };
  return (
  <View style = {{flex : 10, backgroundColor : '#fff', height : 2080}}>
        <View>
        <View style = {{flexDirection : 'row', marginTop : 10}}>
          <Text style = {styles.MainTitle}>게시글 목록</Text>
          <Searchbar
            placeholder='Search'
            onChangeText={onChangeSearch}
            onIconPress={() => setQuery('new')}
            value={query}
            style = {{marginLeft : 20,width : 210, height : 40,}}></Searchbar>
          <TouchableOpacity onPress = {()=>{navigation.reset({ index : 1, routes : [{name : 'Post'}]});}}>
            <Image source = {writeIcon} style = {{width : 40, height : 40, marginLeft : 20,}}/>
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
    cards : {
      borderRadius : 10,
      width : 380,
      height : 80,
      borderWidth : 1,
      marginBottom : 10,
  },
    MainTitle : {
      color : "#27BAFF",
      fontSize : 17,
      fontFamily : 'Jalnan',
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 10,
    },
      item: {
        width : '97%',
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 5,
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