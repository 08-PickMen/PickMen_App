import React, {useEffect, useState, useCallback}from 'react';
import 'react-navigation'
import axios from 'axios';

function CreateRoom({navigation}) {
    const [RoomName, setRoomName] = useState('');
    useEffect(()=> {
        axios.post({
            baseURL : 'http://10.0.2.2:8090/chat/room',
            params : {
                name : RoomName
            }
        })        
    })

}

export default CreateRoom;