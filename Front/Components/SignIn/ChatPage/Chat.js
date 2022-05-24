import React , {useState, useEffect, useCallback} from 'react';
import { GiftedChat, SystemMessage, Bubble} from 'react-native-gifted-chat';
import { LogBox, View} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ConnectChat from './ConnectChat';
import Mentor_id from '../../localData/Mentor_id';
import 'react-navigation';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs'
import * as encoding from 'text-encoding';
import axios from 'axios';
const TextEncodingPolyfill = require('text-encoding');
var StompClient = null;
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});



function Chat({navigation, route}) {
    const [UserId, setUserId] = useState('')
    const [messages, setMessages] = useState([
    ])
    const chatRoom_id = route.params.item_id;
    const renderBubble = props => {
        let username = props.currentMessage.user._id
        console.log("username: "+ username)
        if(username == Number(UserId)){
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
                    marginRight : 10,
                    borderRadius : 5,
                    backgroundColor : '#4458A6'
                }
                }}/>
         )} else {
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
                    borderRadius : 5,
                    backgroundColor: '#27BAFF'
                }
                }}/>
            )
        }
         }
    useEffect(() => {
        async function getUserId() {
            var id = await AsyncStorage.getItem('user_id');
            setUserId(id);
        }
        getUserId();
        axios.get('http://10.0.2.2:8090/chat/room/enter/'+chatRoom_id).then(response => {
            var newlist = [];
            console.log(response.data)
            var count = response.data.length;
            for(var i = 0; i < count; i++){
                newlist.push(
                    {
                        _id : response.data[i].id,
                        text : response.data[i].content,
                        createdAt : response.data[i].createDate,
                        user : {
                            _id : response.data[i].user_id,
                    },
                },)
        }
            newlist.reverse();
            setMessages(newlist);
        })
        var socket = new SockJS('http://10.0.2.2:8090/ws/chat');
        StompClient = Stomp.over(function() {
        return socket;
        })
        StompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        StompClient.subscribe('/sub/chat', function(message) {
            console.log(message);
        });
        StompClient.send("/pub/chat/enter", {}, JSON.stringify(1, Mentor_id));
    });
    },[])
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        StompClient.send('/pub/chat/message',{},JSON.stringify({
                chat_room_id: chatRoom_id,
                content : messages[0].text,
                user_id : UserId,
        }));
    })
    return(
        <View style={{flex:1, backgroundColor : '#fff'}}>
            <GiftedChat
            messages={messages} onSend = {messages => onSend(messages)}
            isLoadingEarlier = {true}
            renderBubble={renderBubble}
            renderAvatar={() => {null}}
            showAvatarForEveryMessage={true}
            messagesContainerStyle={{width : '100%'}}
            user={{
                _id: String(UserId),
                name : '동혁'
            }}/>
        </View>
    )
}


export default Chat;