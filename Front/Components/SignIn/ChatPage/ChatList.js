import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import chatdata from '../../localData/ChatData';
import { Card } from 'react-native-paper';
import axios from 'axios';
import axios2 from 'axios';

// 채팅 리스트 페이지
function ChatList({ navigation }) {
    const [ChatList, setChatList] = React.useState([]);
    const [lastChat, setLastChat] = React.useState([]);
    // 채팅 리스트를 render하는 함수
    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Chat', { item_id: item.chatRoom_id }) }}>
            <View style={style.cards}>
                <Image source={{ uri: 'http://10.0.2.2:8090/getProfile?userid=' + Number(item.id) }} style={{ marginRight: 'auto', width: 80, height: 80, borderRadius: 120 }}></Image>
                <Text>{ }</Text>
                <Text>{ }</Text>
            </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        )
    };
    async function loadlastChat(room_id) {
        var text = ''
        const list = [];

        text = await axios2.get('http://10.0.2.2:8090/chat/room/enter/' + room_id).then(function (response) {
            for (var i of response.data) {
                list.push(i);
            }
            return list[list.length - 1].content;
        })
    }
    // 채팅 리스트를 불러오는 함수
    useEffect(() => {
        axios.get('http://10.0.2.2:8090/chat/rooms').then(response => {
            var data = response.data;
            if (response.data.length > 1)
                setChatList(data.reverse());
            else
                setChatList(data);
            console.log(data)
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View >
                <Text style={style.Title}>
                    멘토 채팅 리스트
                </Text>
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: .5 }} />
            <View>
                <FlatList
                    data={ChatList}
                    renderItem={renderItem}
                    keyExtractor={item => item.chatRoom_id}
                ></FlatList>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    cards: {
        width: 400,
        hegiht: 200,
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        borderBottomColor: '#a0a0a0',
        borderBottomWidth: 1,
    },
    ChatTitle: {
        fontSize: 20,
        color: '#27BAFF',
        fontFamily: 'NanumSquareRoundB',
    },
    Title: {
        fontFamily: 'Jalnan',
        fontSize: 17,
        color: "#27BAFF",
        marginLeft: 10,
        marginTop: 18,
    },
})

export default ChatList;