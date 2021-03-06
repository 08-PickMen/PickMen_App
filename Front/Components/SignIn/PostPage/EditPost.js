import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-navigation'
import { CommonActions } from '@react-navigation/native';
import data from './PostData';
// 게시글 수정 API
const updatePost = async (id, Title, Content) => {
    await axios.post('http://10.0.2.2:8090/post/update/'+id, null, {
        params: {
            title: Title,
            content: Content,
        }
    }).then(response => {
        console.log(response.data);
    })
}
// 게시글을 수정하는 함수
const BoardEdit = async (navigation, newTitle, newContent) => {
    var data1 = await AsyncStorage.getItem('Post_id');
    var data2 = await AsyncStorage.getItem('user_id');

    updatePost(data1, newTitle, newContent);
    var count = parseInt(data.length);
    count = count - 1;
    for (count; count >= 0; count--) {
        if (data[count].id == data1) {
            console.log(data[count].id, data1)
            const index = data.indexOf(data[count]);
            data[index] = {
                id: data[count].id,
                title: newTitle,
                content: newContent,
                user: data2,
                nickname: data[count].nickname,
                count: data[count].count,
            }
            break;
        }
    }
    Alert.alert(
        '게시글이 수정되었습니다',
        '',
        [
            {
                text: '확인',
                onPress: () => {
                    navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'PostPage' }]
                    }))
                },

            }
        ]
    )
}
// 게시글 수정 화면
const EditPost = ({ navigation }) => {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    return (
        <View style = {{flex : 1, backgroundColor : '#27BAFF'}}>
            <View style = {styles.PageStyle}>
            <Text style={styles.Text}>게시글 수정하기</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.PostText}>글 쓰기</Text>
                <TouchableOpacity style={styles.Button} onPress={() => { BoardEdit(navigation, Title, Content); }}>
                    <Text style={styles.ButtonText}>수정 완료</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
                <TextInput style={styles.TitleInput} placeholder='제목' onChangeText={(Title) => setTitle(Title)}>

                </TextInput>
            </View>
            <View>
                <TextInput style={styles.TextInput} multiline={true} placeholder='내용을 입력해주세요.' onChangeText={(Content) => setContent(Content)}>

                </TextInput>
            </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    TitleInput: {
        width: 350,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    TextInput: {
        width: 350,
        height: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20

    },
    Text: {
        color: "#27BAFF",
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    Button: {
        width: 80,
        height: 40,
        backgroundColor: "#27BAFF",
        borderColor: 'black',
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 10,
    },
    ButtonText: {
        color: "white",
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    ExitText: {
        color: "black",
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    AnotherText: {
        color: "#27BAFF",
        marginTop: 20,
        marginLeft: 30,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    PostText: {
        color: "#27BAFF",
        marginTop: 10,
        marginLeft: 30,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    PageStyle: {
        backgroundColor: 'white',
        width: 380,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    
});

export default EditPost;