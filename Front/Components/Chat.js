import React , {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { GiftedChat, SystemMessage} from 'react-native-gifted-chat';
import InitialMessage from './messages';
import { Keyboard } from 'react-native';
import 'react-navigation';
import { LogBox } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';


function Chat() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [UserId, setUserId] = useState('')
    const [messages, setMessages] = useState([
    ])
    const [sendMessage, setSendMessage] = useState([])
    async function getUserId() {
        await AsyncStorage.getItem('user_id').then(value => {
            setUserId(value);
        })
    }
    getUserId();
    console.log(UserId)
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        firestore().collection('messages-'+ parseInt(UserId)).add({
            user_id : parseInt(UserId),
            text : messages[0].text,
            createdAt : firebase.firestore.FieldValue.serverTimestamp(),
        })
    })
    console.log(messages)
    return(
            <GiftedChat

            messages={messages} onSend = {messages => onSend(messages)}
            user={{
                _id: 1,
            }}/>
    )
}


export default Chat;