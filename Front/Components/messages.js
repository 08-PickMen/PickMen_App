import React from 'react';
import {Text} from 'react-native';

function System() {
    return (
        <Text style = {{
            fontSize : 12,
            fontFamily : 'Jalnan',
            color : "#27BAFF",
        }}>
            New Rooms
        </Text>
    )
}

const messages = [
    {
        _id : 0,
        text : System(),
        createdAt : new Date().getTime(),
        system : true
    },
    {
        _id : 1,
        text : 'Hello',
        createdAt : new Date().getTime(),
        user : {
            _id : 2,
            name : '유저1',
        }
    }
]

export default messages;