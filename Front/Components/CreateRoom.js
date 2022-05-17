import React, {useEffect, useRef}from 'react';
import SockJS from 'sockjs-client';
import 'react-navigation'

var stompClient = null;

function CreateRoom() {
    const socket = new SockJS('http://10.0.2.2:8090/chat');

}

export default CreateRoom;