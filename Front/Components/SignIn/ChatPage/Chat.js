import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, SystemMessage, Bubble } from 'react-native-gifted-chat';
import { LogBox, View, BackHandler, Alert} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ConnectChat from './ConnectChat';
import Mentor_id from '../../localData/Mentor_id';
import 'react-navigation';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'
import * as encoding from 'text-encoding';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

const TextEncodingPolyfill = require('text-encoding');
var StompClient = null;
// Text Encoder polyfill
Object.assign(global, {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
});


// 채팅방 입장 및 채팅 기능 페이지
function Chat({ navigation, route }) {
    const [UserId, setUserId] = useState('')
    const [messages, setMessages] = useState([
    ])
    const chatRoom_id = route.params.item_id;
    // 채팅 메시지를 상대방과 접속한 user id를 비교하고 좌측, 우측 채팅 메시지를 나누어서 출력하는 함수
    const renderBubble = props => {
        let username = props.currentMessage.user._id
        console.log("username: " + username)
        if (username == Number(UserId)) {
            return (
                <Bubble
                    {...props}
                    position='right'
                    textStyle={{
                        right: {
                            color: 'black',
                        }
                    }}
                    wrapperStyle={{
                        right: {
                            marginRight: 10,
                            borderRadius: 5,
                            backgroundColor: '#4458A6'
                        }
                    }} />
            )
        } else {
            return (
                <Bubble
                    {...props}
                    position='left'
                    textStyle={{
                        left: {
                            color: 'white',
                        }
                    }}
                    wrapperStyle={{
                        left: {
                            borderRadius: 5,
                            backgroundColor: '#27BAFF'
                        }
                    }} />
            )
        }
    }
    // 채팅 api와 연결하고 채팅 메세지 목록을 불러오는 함수
    useEffect(() => {
        async function getUserId() {
            var id = await AsyncStorage.getItem('user_id');
            setUserId(id);
        }
        getUserId();
        axios.get('http://10.0.2.2:8090/chat/room/enter/' + chatRoom_id).then(response => {
            var newlist = [];
            console.log(response.data)
            var count = response.data.length;
            for (var i = 0; i < count; i++) {
                newlist.push(
                    {
                        _id: response.data[i].id,
                        text: response.data[i].content,
                        createdAt: response.data[i].createDate,
                        user: {
                            _id: response.data[i].user_id,
                        },
                    })
            }
            newlist.reverse();
            setMessages(newlist);
        })
        var socket = new SockJS('http://10.0.2.2:8090/ws/chat');
        StompClient = Stomp.over(function () {
            return socket;
        })
        StompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            StompClient.subscribe('/sub/chat', function (message) {
                console.log(message);
            });
            StompClient.send("/pub/chat/enter", {}, JSON.stringify(1, Mentor_id));
        });
        const backAction = () => {
            navigation.dispatch(CommonActions.reset({
                index : 0,
                routes : [{name : 'ChatPage'}]
            }))
        }
        BackHandler.addEventListener('hardwareBackPress', function(){
            backAction();
            return true;
        });
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    // 채팅 메시지를 전송하는 함수
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        StompClient.send('/pub/chat/message', {}, JSON.stringify({
            chat_room_id: chatRoom_id,
            content: messages[0].text,
            user_id: UserId,
        }));
    })
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <GiftedChat
                messages={messages} onSend={messages => onSend(messages)}
                isLoadingEarlier={true}
                renderBubble={renderBubble}
                renderAvatar={() => { null }}
                showAvatarForEveryMessage={true}
                messagesContainerStyle={{ width: '100%' }}
                user={{
                    _id: String(UserId),
                    name: '동혁'
                }} />
        </View>
    )
}


export default Chat;