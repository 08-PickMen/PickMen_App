import React , {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { GiftedChat, IMessage} from 'react-native-gifted-chat';
import InitialMessage from './messages';
import 'react-navigation';


function Chat() {
    const [Messages, setMessages] = useState([]);

    useEffect(()=> {
        setMessages(InitialMessage.reverse());
    },[])
    function SendEvent(newMessage=[]) {
        setMessages(GiftedChat.append(Messages, newMessage));
    }

    return(
            <GiftedChat messages={Messages}
                onSend = {newMessage=> SendEvent(newMessage)}
                user={{ _id : 1}}
                messagesContainerStyle={{backgroundColor : '#dff',}}
                >
            </GiftedChat>
    )
}


export default Chat;