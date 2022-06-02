import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { LogBox, View, BackHandler, Alert, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Mentor_id from '../../localData/Mentor_id';
import 'react-navigation';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'
import * as encoding from 'text-encoding';
import Modal from 'react-native-modal';
import axios, { Axios } from 'axios';
import { CommonActions } from '@react-navigation/native';
import Moment from 'moment';
import paper_planeIcon from '../../../icons/paper-plane.png';
import backButtonIcon from '../../../icons/left-arrow.png';
import { CheckBox, Chip } from 'react-native-elements';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import star from '../../../icons/star.png';
import whiteStar from '../../../icons/whitestar.png';
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
    const [ModalVisible, setModalVisible] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [content, setContent] = useState('');
    const chatRoom_id = route.params.item_id;
    const other_id_nickname = route.params.item_nickname;
    const other_id = route.params.item_other_id;
    const [item_rated, setItemRated] = useState(route.params.item_rated);
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
    const renderReviewText = (rated) => {

        if (rated == true) {
            return (
                <View>
                    <Text>평가를 완료하셨습니다.</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>평가 버튼</Text>
                </View>
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
        const { text, messageIdGenerator, user, onSend } = senderProps;
        return (
            <TouchableOpacity onPress={() => {
                if (text && onSend) {
                    onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true);
                }
            }}>
                <View style={{ width: 45, height: 45, borderRadius: 30, borderWidth: 0, borderColor: '#a0a0a0', backgroundColor: '#27BAFF', marginTop: 2, marginRight: 10, }}>
                    <Image source={paper_planeIcon} style={{ width: 30, height: 30, marginLeft: 5, marginRight: 10, marginTop: 7 }} />
                </View>
            </TouchableOpacity>
        )
    }
    const MakeReview = (content) => {
        const review = {
            content: String(content),
            mentor: {
                id: Number(other_id)
            },
            rating: Number(checked1 + checked2 + checked3 + checked4 + checked5),
        }
        axios.post('http://10.0.2.2:8090/chat/room/makeReview/' + chatRoom_id, JSON.stringify(review),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                console.log(response)
            })
    }
    const renderInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={
                    styles.InputToolbar
                } />
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', height: 60, }}>
                <TouchableOpacity onPress={backAction}>
                    <Image source={backButtonIcon} style={{ width: 30, height: 30, marginLeft: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <Text style={styles.nickName}>{other_id_nickname}</Text>
                <TouchableOpacity disabled={item_rated}
                    onPress={() => setModalVisible(true)} style={{ marginLeft: 'auto', marginRight: 20, marginTop: 15, }}>
                    {renderReviewText(item_rated)}
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={ModalVisible}
                transparent={true}>
                <View style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 300, borderRadius: 20, backgroundColor: '#fff', borderColor: 'white', borderWidth: 1, width: 350, height: 300 }}>
                    <View>
                        <Text style={styles.RatingTitle}>평가를 남기시겠습니까?</Text>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 'auto', marginTop: 20, flexDirection: 'row' }}>
                        <CheckBox
                            checked={checked1}
                            onPress={() => setChecked1(!checked1)}
                            checkedIcon={<Image source={star} style={styles.RatingIconStyle} />}
                            uncheckedIcon={<Image source={whiteStar} style={styles.RatingIconStyle} />}
                        ></CheckBox>
                        <CheckBox
                            checked={checked2}
                            onPress={() => {
                                setChecked1(!checked1);
                                setChecked2(!checked2);
                            }}
                            checkedIcon={<Image source={star} style={styles.RatingIconStyle} />}
                            uncheckedIcon={<Image source={whiteStar} style={styles.RatingIconStyle} />}
                        ></CheckBox>
                        <CheckBox
                            checked={checked3}
                            onPress={() => {setChecked3(!checked3);
                                setChecked1(!checked1);
                                setChecked2(!checked2);
                            }}
                            checkedIcon={<Image source={star} style={styles.RatingIconStyle} />}
                            uncheckedIcon={<Image source={whiteStar} style={styles.RatingIconStyle} />}
                        ></CheckBox>
                        <CheckBox
                            checked={checked4}
                            onPress={() => {setChecked4(!checked4);
                                setChecked3(!checked3);
                                setChecked2(!checked2);
                                setChecked1(!checked1);
                            }}
                            checkedIcon={<Image source={star} style={styles.RatingIconStyle} />}
                            uncheckedIcon={<Image source={whiteStar} style={styles.RatingIconStyle} />}
                        ></CheckBox>
                        <CheckBox
                            checked={checked5}
                            onPress={() => {
                                setChecked5(!checked5);
                                setChecked4(!checked4);
                                setChecked3(!checked3);
                                setChecked2(!checked2);
                                setChecked1(!checked1);
                            }}
                            checkedIcon={<Image source={star} style={styles.RatingIconStyle} />}
                            uncheckedIcon={<Image source={whiteStar} style={styles.RatingIconStyle} />}
                        ></CheckBox>
                    </View>
                    <View>
                        <TextInput
                            onChangeText={(text) => setContent(text)}
                            style={{ width: 300, height: 60, borderColor: '#a0a0a0', marginLeft: 20, borderWidth: 1, borderRadius: 10, }}>
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 30, marginLeft: 20, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.NotRatingButton}>
                            <Text style={styles.Text}>평가 안하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            MakeReview(content); setModalVisible(false); setItemRated(true);
                            navigation.dispatch(CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'ChatPage' }],
                            }))
                        }} style={styles.RatingButton}>
                            <Text style={styles.Text}>평가하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <GiftedChat
                messages={messages} onSend={messages => onSend(messages)}
                isLoadingEarlier={true}
                renderBubble={renderBubble}
                renderAvatar={() => { null }}
                showAvatarForEveryMessage={true}
                placeholder={'메시지를 입력하세요'}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                renderTime={(props) => (
                    <View style={props.containerStyle}>
                        <View style={props.containerStyle}>
                            <Text style={{ color: 'white', fontFamily: 'NanumSqureRound', marginLeft: props.position === "left" ? 12 : 0, marginRight: props.position === "right" ? 2 : 0 }}>
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
    InputToolbar: {
        height: 50,
    },
    nickName: {
        fontFamily: 'NanumSqureRoundB',
        fontSize: 20,
        color: 'black',
        marginLeft: 40,
        marginTop: 10,
    },
    RatingTitle: {
        fontFamily: 'NanumSqureRoundB',
        fontSize: 17,
        color: 'black',
        marginLeft: 20,
        marginTop: 20,
    },
    RatingIconStyle: {
        width: 30,
        height: 30,
        marginLeft: -10,
        marginTop: 30
    },
    RatingButton: {
        width: 90,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 20,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    NotRatingButton: {
        width: 90,
        height: 40,
        paddingTop: 5,
        borderRadius: 5,
        backgroundColor: "#ff0000"
    },
    Text: {
        color: "white",
        textAlign: "center",
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 14,
        fontFamily: 'Jalnan',
    },

})


export default Chat;