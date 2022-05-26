import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import chatdata from '../../localData/ChatData';
import { Card } from 'react-native-paper';
import axios from 'axios';
import join from '../../../icons/enter.png'

// 채팅 리스트 페이지
function ChatList({ navigation }) {
    const [ChatList, setChatList] = React.useState([]);

    // 채팅 리스트를 render하는 함수
    const Item = ({ item }) => (
        <TouchableOpacity  style={{marginTop : 20,marginBottom : 10,}} onPress={() => { navigation.navigate('Chat', { item_id: item.chatRoom_id }) }}>
            <View style={style.cards}>
                <Image source={{ uri: 'http://10.0.2.2:8090/getProfile?userid=' + Number(item.other_id) }} style={{ marginLeft : 20,marginRight: 20, width: 60, height: 60, borderRadius: 120, borderWidth : 1, borderColor  :'#a0a0a0'}}></Image>
                <SafeAreaView style = {{}}>
                    <View>
                        <Text style = {{marginRight : 15, fontFamily : 'Jalnan', fontSize : 15, color : 'black'}}>{item.other_id_nickname}</Text>
                    </View>
                    <Text style = {{marginTop : 10, fontFamily : 'NanumSquareRound', fontSize : 13, color : 'black'}}>{item.lastChat}</Text>
                </SafeAreaView>
                <SafeAreaView style = {{flex : 1}}>
                    <Text style = {{marginRight : 10, fontFamily : 'Jalnan', fontSize : 12, color : '#a0a0a0'}}>소프트웨어학과</Text>
                </SafeAreaView>
                <View>
                    <Text style = {{fontSize : 13, marginTop : 10, marginRight : 10}}>05-23 12:49</Text>
                </View>
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
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style = {style.PageStyle}>
            <View >
                <Text style={style.Title}>
                    멘토 채팅 리스트
                </Text>
            </View>
            <View>
                <FlatList
                    data={ChatList}
                    renderItem={renderItem}
                    keyExtractor={item => item.chatRoom_id}
                ></FlatList>
            </View>
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
        flexDirection : 'row'
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
    PageStyle: {
        backgroundColor: 'white',
        width: 380,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
})
export default ChatList;