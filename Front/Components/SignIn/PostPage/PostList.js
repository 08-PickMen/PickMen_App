import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, Image, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import filter from 'lodash.filter';
import postdata from './PostData';
import newPostData from '../../localData/newPostData';
import { Card } from 'react-native-paper'
import writeIcon from '../../../icons/writing.png';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/ko';

function PostList({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  var [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState(null);
  const [selectedId, setSelectedId] = useState(null)
  useEffect(() => {
    axios.get('http://10.0.2.2:8090/post/getPost')
      .then(response => {
        var count = parseInt(response.data.numberOfElements);
        var newData = [];
        count = count - 1;
        for (count; count >= 0; count--) {
          newData.push({
            id: response.data.content[count].id,
            title: response.data.content[count].title,
            user: response.data.content[count].user.id,
            content: response.data.content[count].content,
            count: response.data.content[count].count,
            nickname: response.data.content[count].user.nickname,
          })
        }
        setData(newData)
      }).catch(error => {
        console.log(error)
      })
  }, []);
  // time을 기다렸다가 실행하는 함수 -> 근데 작동하지는 않음 사용 X
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  // 새로고침 -> 작동안함
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // 댓글 Count를 update 하는 함수
  async function updateCount(item, id) {
    await axios.post('http://10.0.2.2:8090/post/upcountPost?id=' + id).then(response => {
    })
  }
  // 게시글 리스트를 보여주는 함수
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Card style={styles.cards}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: 'http://10.0.2.2:8090/getProfile?userid=' + Number(item.user) }} style={{ marginLeft: 15, marginTop: 20, width: 60, height: 60, borderRadius: 90 }} />
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Text style={{ marginLeft: 135, marginTop : 20}}>조회 수 {item.count}</Text>
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style = {{flexDirection : 'row'}}>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
  // 게시글을 눌렀을 때 게시글 정보를 저장하는 함수
  function loadPost(item, id) {
    var count = data.length;
    for (count = count - 1; count >= 0; count--) {
      if (data[count].id == id) {
        newPostData.push(data[count],);
        break;
      }
    }
  }
  // 게시글을 눌렀을 때 댓글 횟수를 증가시키는 함수
  function datacountUp(id) {
    var count = data.length;
    for (count = count - 1; count >= 0; count--) {
      if (data[count].id == id) {
        data[count].count = data[count].count + 1;
        break;
      }
    }
  }
  // 게시글 조회
  function updateSearch(text) {
    if (text) {
      const newData = postdata.filter(function (item) {
        const itemData = (item.title ? item.title.toUpperCase() : ''.toUpperCase());
        const contentData = (item.content ? item.content.toUpperCase() : ''.toUpperCase());
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 || contentData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(postdata);
      setSearch(text);
    }
  }
  //게시글 리스트를 render하고 게시글을 선택했을 때 게시글 내용으로 이동
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id); loadPost(item, item.id); updateCount(item, item.id); datacountUp(item.id); navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'PostPage' }, { name: 'ViewPost' },]
          }))
        }}
        style={{ backgroundColor }}
      />
    )
  };
  return (
    <View style={{flex : 1, backgroundColor: '#27BAFF'}}>
      <View style = {styles.PageStyle}>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.MainTitle}>게시글 목록</Text>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => updateSearch(text)}
            value={search}
            style={{ marginLeft: 17, width: 200, height: 40 }}
          />
          <TouchableOpacity onPress={() => { navigation.reset({ index: 1, routes: [{ name: 'Post' }] }); }}>
            <Image source={writeIcon} style={{ width: 40, height: 40, marginLeft: 20, }} />
          </TouchableOpacity>
        </View>
        <View style ={{flexgrow : 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          windowSize={2}
          contentContainerStyle={{flexGrow : 1}}>
        </FlatList>
        </View>
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
  cards: {
    borderRadius: 10,
    width: 370,
    height: 200,
    borderWidth: 1,
    marginTop : 10,
    marginBottom: 10,
    marginLeft : 4,
    marginRight : 'auto',
  },
  nickname: {
    fontSize: 14,
    fontFamily: 'Jalnan',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: 'black'
  },
  MainTitle: {
    color: "#27BAFF",
    fontSize: 17,
    fontFamily: 'Jalnan',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,

  },
  item: {
    width: '97%',
    marginRight: 'auto',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: 'NanumSquareRoundB',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: 'black'
  },
  content: {
    fontSize: 15,
    fontFamily: 'NanumSquareRoundB',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: '#a0a0a0'
  },
  Button: {
    width: 80,
    height: 40,
    backgroundColor: "#27BAFF",
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 10,
  },
  ButtonText: {
    color: "white",
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Jalnan',
  },
  PageStyle: {
    backgroundColor: 'white',
    width: 380,
    height: 680,
    borderColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
},
});
export default PostList;