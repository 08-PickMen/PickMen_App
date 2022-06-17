import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native';
import 'react-navigation';
import axios from 'axios';
import data from './PostPage/PostData'
import profiledata from '../localData/ProfileData'
import auth from '@react-native-firebase/auth';
import myprofile from '../localData/MyProfile';
// 멘토 리스트 정보를 담을 함수
const saveMentorList = async () => {
    try {
        await axios.get('http://10.0.2.2:8090/mentorList').then(async (response) =>{
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                await AsyncStorage.setItem('data' + i, JSON.stringify(data[i]));
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// 멘토 리스트 정보를 불러오는 함수
const loadData = async () =>{
    await axios.get('http://10.0.2.2:8090/mentorList').then(async (response) => {
        var data = response.data;
        var maxcount = data.length;
        profiledata.length = 0;
        for (var i = 0; i < maxcount; i++) {
            var data2 = await AsyncStorage.getItem('data' + i);
            var newData = JSON.parse(data2);
            profiledata.push(newData);
        }
    }
    )
}
// 자신의 프로필 정보를 불러오는 함수
const loadprofile = async () => {
    await axios.get('http://10.0.2.2:8090/user/myprofile').then(async (response) => {
        myprofile.length = 0;
        console.log(response.data);
        myprofile.push({
            averageRating: response.data.data.averageRating,
            email: response.data.data.email,
            id: response.data.data.id,
            userLectures: response.data.data.userLectures,
            nickname: response.data.data.nickname,
            introduceMyself: response.data.data.introduceMyself,
            livingWhere: response.data.data.livingWhere,
            role: response.data.data.role,
            mentoringContents: response.data.data.mentoringContents,
        })
    })
}
// 로그인 페이지
const LoginPage = ({ navigation }) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 접속한 user id를 저장하는 함수
    const saveUserId = async (user_id) => {
        if (user_id)
            await AsyncStorage.setItem('user_id', JSON.stringify(user_id));
    }
    // 로그인 정보를 서버에 보내고 성공시 홈 화면으로 이동하는 함수
    const LoginAccess = async (email, password) => {
        axios.post('http://10.0.2.2:8090/login', null, {
            params: {
                username: email,
                password: password,
            }
        }).then(response => {
            if (response.data.status == 200) {
                saveUserId(response.data.data.id);
                loadprofile();
                navigation.navigate('HomeScreen', { item_nickname: response.data.data.nickname });
            } else {
                alert('아이디 또는 비밀번호가 틀렸습니다.');
                navigation.navigate('LoginPage');
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    // 전체 게시글 정보를 불러오는 함수
    const loadBoard = async () => {
        await axios.get('http://10.0.2.2:8090/post/getPost')
            .then(response => {
                var count = parseInt(response.data.numberOfElements);
                count = count - 1;
                for (count; count >= 0; count--) {
                    data.push({
                        id: response.data.content[count].id,
                        title: response.data.content[count].title,
                        user: response.data.content[count].user.id,
                        content: response.data.content[count].content,
                        count: response.data.content[count].count,
                        nickname: response.data.content[count].user.nickname,
                    })
                }
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        data.length = 0,
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style={styles.PageStyle}>
                <View>
                    <Text style={styles.Text}>
                        PickMen
                    </Text>
                </View>
                <View>
                    <TextInput style={styles.TextInput} placeholder="ID" onChangeText={(UserEmail) => setEmail(UserEmail)} >
                    </TextInput>
                    <TextInput secureTextEntry={true} style={styles.TextInput} placeholder="Password" onChangeText={(password) => setPassword(password)} />
                </View>
                <TouchableOpacity style={styles.startButton}
                    onPress={() => {
                        LoginAccess(email, password);
                        saveMentorList();
                        loadData();
                        loadBoard();
                        navigation.navigate('HomeScreen');
                        data.length = 0;
                    }}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    startButton: {
        width: 280,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        borderRadius: 5,

        backgroundColor: "#27BAFF"
    },
    Text: {
        color: "#27BAFF",
        textAlign: "center",
        marginTop: 150,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 28,
        marginBottom: 60,
        fontFamily: 'Jalnan',
    },
    ButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 4,
        fontSize: 18,
        fontFamily: 'Jalnan',
    },
    TextInput: {
        width: 320,
        height: 50,
        margin: 12,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 5,
    },
    PageStyle: {
        backgroundColor: 'white',
        width: 380,
        height: 720,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default LoginPage;