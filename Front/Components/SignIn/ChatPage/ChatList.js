import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import chatdata from '../../localData/ChatData';
import {Card} from 'react-native-paper';
import axios from 'axios';


function ChatList({navigation}) {
    const [ChatList, setChatList] = React.useState([]);

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={()=>{navigation.navigate('Chat')}}>
          <Card>
             <Text>{item.id}</Text>
          </Card>
        </TouchableOpacity>

    );
    const renderItem = ({ item }) => {
        return (
          <Item
            item={item}
          />
        )
      };

    useEffect(() => {
        axios.get('http://10.0.2.2:8090/chat/rooms').then(response => {
            var data = response.data;
            setChatList(data);
            console.log(ChatList)
        })
    },[])
    return (
        <View style={{flex : 1, backgroundColor : '#fff'}}>
            <View >
                <Text style = {style.Title}>
                    멘토 채팅 리스트
                </Text>
            </View>
            <View style = {{borderBottomColor : 'black', borderBottomWidth : .5}}/>
            <FlatList
                data = {ChatList}
                renderItem={renderItem}
            />
            </View>
    )
}

const style = StyleSheet.create({
    cards : {
        width : 400,
        marginTop : 5,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 10,
    },
    ChatTitle : {
        fontSize : 20,
        color : '#27BAFF',
        fontFamily : 'NanumSquareRoundB',
    },
    Title : {
        fontFamily: 'Jalnan',
        fontSize : 17,
        color : "#27BAFF",
        marginBottom : 10,
        marginLeft : 10,
        marginTop : 18,
    },
})

export default ChatList;