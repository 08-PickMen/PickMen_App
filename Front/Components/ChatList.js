import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList} from 'react-native';
import {List, Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import chatdata from './ChatData';
import {Card} from 'react-native-paper';

async function saveChatList(chatlist) {
    if(chatlist)
    await AsyncStorage.setItem('chatlist', JSON.stringify(chatlist));
}
async function getChatList() {
    var data = await AsyncStorage.getItem('chatlist');
    var newData = JSON.parse(data);
    chatdata.length = 0;
    chatdata.push(newData);
}
function loadChat() {
    try{
        firestore()
        .collection('THREADS')
        .onSnapshot(async querySnapshot => {
            const threads = querySnapshot.docs.map((documentSnapshot)=> {
                return {
                    _id : documentSnapshot.id,
                    name : '',
                    ...documentSnapshot.data(),
                }
            });
            saveChatList(threads);
        })
    } catch(error){
        console.log(error)
    }
}

function ChatList({navigation}) {
    loadChat();
    getChatList();
    
    return (
        <View style={{flex : 1, backgroundColor : '#fff'}}>
            <View >
                <Text style = {style.Title}>
                    멘토 채팅 리스트
                </Text>
            </View>
            <View style = {{borderBottomColor : 'black', borderBottomWidth : .5}}/>
            <FlatList
                data={chatdata[0]}
                keyExtractor={(item) => item.id}
                renderItem = {({item}) => (                  
                    <View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Chat')}>
                    <Card style = {style.cards}>
                    <List.Item
                        style = {{borderBottomColor : '#27BAFF'}}
                        titleStyle = {style.ChatTitle}
                        title={item.name}
                        description='Chat room'/>
                        </Card>
                        </TouchableOpacity>
                        </View>
                )}/>
                
                </View>
    )
}

const style = StyleSheet.create({
    cards : {
        borderRadius : 10,
        width : 400,
        marginTop : 5,
        borderWidth : 1,
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