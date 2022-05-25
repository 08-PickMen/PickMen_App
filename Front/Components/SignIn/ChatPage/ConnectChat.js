import 'react-navigation';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'
import * as encoding from 'text-encoding';
const TextEncodingPolyfill = require('text-encoding');

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});
// 채팅 연결 함수
const ConnectChat = (mentor_id) => {
  var socket = new SockJS('http://10.0.2.2:8090/ws/chat');
  var StompClient = Stomp.over(function () {
    return socket;
  })
  StompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    StompClient.subscribe('/sub/chat', function (message) {
      console.log(message);
    });
    StompClient.send("/pub/chat/enter", {}, JSON.stringify(1, mentor_id));
  });
}

export default ConnectChat;