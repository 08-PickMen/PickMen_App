import React , {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import 'react-navigation';

function System() {
    return (
        <Text style = {{
            fontSize : 12,
            fontFamily : 'Jalnan',
            color : "#27BAFF",
        }}>
            New Room
        </Text>
    )
}


function Chat() {
    const [Messages, setMessages] = useState([
        {
            _id : 0,
            text : System(),
            createdAt : new Date().getTime(),
            system : true
        },
        {
            _id : 1,
            text : 'Helloss',
            createdAt : new Date().getTime(),
            user : {
                _id : 2,
                name : '유저1',
            }
        }
    ]);
    async function SendEvent(newMessage=[]) {
        try{
        setMessages(GiftedChat.append(Messages, newMessage));
        }catch(EventEmitter){
            console.log(EventEmitter);
        }
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