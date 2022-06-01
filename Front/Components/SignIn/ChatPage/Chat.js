import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { LogBox, View, BackHandler, Alert, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import Mentor_id from '../../localData/Mentor_id';
import 'react-navigation';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'
import * as encoding from 'text-encoding';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import Moment from 'moment';
import paper_planeIcon from '../../../icons/paper-plane.png';
import backButtonIcon from '../../../icons/left-arrow.png';
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
    const [messages, setMessages] = useState([])
    const chatRoom_id = route.params.item_id;
    const other_id_nickname = route.params.item_nickname;
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
                            fontFamily: 'NanumSqureRoundB',
                        }
                    }}
                    wrapperStyle={{
                        right: {
                            marginRight: 10,
                            borderRadius: 5,
                            backgroundColor: '#94b9f3'
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
                            color: 'black',
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
            console.log(newlist)
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
    }, [])
    const backAction = () => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'ChatPage' }]
        }))
    }
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    // 채팅 메시지를 전송하는 함수
    const onSend = useCallback((messages = []) => {
        setMessages(newMessage => GiftedChat.append(newMessage, messages));
        console.log(messages)
        StompClient.send('/pub/chat/message', {}, JSON.stringify({
            chat_room_id: chatRoom_id,
            content: messages[0].text,
            user_id: UserId,
        }));
    })
    const renderSend = senderProps => {
        const {text, messageIdGenerator, user, onSend} = senderProps;
        return (
            <TouchableOpacity onPress={()=>
            {
                if(text && onSend) {
                    onSend({text : text.trim(), user : user, _id : messageIdGenerator()},true);
                }
            }}>
                <View style = {{ width: 45, height: 45,borderRadius : 30, borderWidth : 0, borderColor : '#a0a0a0', backgroundColor : '#27BAFF', marginTop : 2,marginRight : 10,}}>
                    <Image source={paper_planeIcon} style={{ width: 30, height: 30,  marginLeft : 5, marginRight : 10, marginTop : 7}} />
                </View>
            </TouchableOpacity>
        )
    }
    const renderInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={
                    styles.InputToolbar
                }/>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style = {{flexDirection : 'row',height : 60,}}>
                <TouchableOpacity onPress={backAction}>
                    <Image source={backButtonIcon} style={{ width: 30, height: 30, marginLeft : 10, marginTop : 10}} />
                </TouchableOpacity>
                <Text style = {styles.nickName}>{other_id_nickname}</Text>
            </View>
            <GiftedChat
                messages={messages} onSend={messages => onSend(messages)}
                isLoadingEarlier={true}
                renderBubble={renderBubble}
                renderAvatar={() => { null }}
                showAvatarForEveryMessage={true}
                placeholder= {'메시지를 입력하세요'}
                renderSend= {renderSend}
                renderInputToolbar={renderInputToolbar}
                renderTime={(props) => (
                    <View style={props.containerStyle}>
                        <View style={props.containerStyle}>
                            <Text style={{color : 'white', fontFamily : 'NanumSqureRound', marginLeft : props.position === "left" ? 12 : 0, marginRight : props.position === "right" ? 2 : 0}}>
                                {Moment(props.currentMessage.createdAt).format('HH : mm')}
                            </Text>
                        </View>
                    </View>
                )}
                messagesContainerStyle={{ width: '100%', }}
                
                user={{
                    _id: String(UserId),
                    name: '동혁'
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    InputToolbar : {
        height : 50,
    },
    nickName : {
        fontFamily : 'NanumSqureRoundB',
        fontSize : 20,
        color : 'black',
        marginLeft : 40,
        marginTop : 10,
    }
})


export default Chat;