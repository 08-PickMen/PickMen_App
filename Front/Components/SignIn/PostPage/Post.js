import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import 'react-navigation';
import axios from 'axios';
import data from './PostData';
import 'react-navigation'
import { CommonActions } from '@react-navigation/native';

// 전체 게시글을 불러오는 함수
const loadBoard = async () => {
    await axios.get('http://10.0.2.2:8090/post/getAll')
        .then(response => {
            var count = parseInt(response.data.totalElements);
            if (count == 1) {
                data.length = 0;
                data.push({
                    id: response.data.content[0].id,
                    title: response.data.content[0].title,
                    user: response.data.content[0].user.id,
                    content: response.data.content[0].content,
                    count: response.data.content[0].count,
                    nickname: response.data.content[0].user.nickname,
                    Reply: response.data.content[0].reply.length
                })
            }
            else if (count > 1) {
                count = count - 1;
                data.length = 0;
                for (count; count >= 0; count--) {
                    data.push({
                        id: response.data.content[count].id,
                        title: response.data.content[count].title,
                        user: response.data.content[count].user.id,
                        content: response.data.content[count].content,
                        count: response.data.content[count].count,
                        nickname: response.data.content[count].user.nickname,
                        Reply: response.data.content[count].reply.length
                    })
                }
            }
        }).catch(error => {
            console.log(error)
        })
}
// 게시글 작성 함수
const WritePost = (Title, Content, navigation) => {
    console.log(Title, Content)
    axios.post('http://10.0.2.2:8090/post/write', null, {
        params: {
            title: Title,
            content: Content
        }
    }).then(response => {
        console.log(response.data)
    })
    Alert.alert(
        '게시글이 작성되었습니다',
        '',
        [
            {
                text: '확인',
                onPress: () => {
                    loadBoard(); navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'PostPage' }]
                    }))
                },

            }
        ]
    )
}
// 게시글을 작성하는 페이지
const Post = ({ navigation }) => {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    return (
        <View style = {{flex : 1, backgroundColor : '#27BAFF'}}>
            <View style = {styles.PageStyle}>
            <Text style={styles.Text}>게시글 쓰기</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity 
                    onPress={()=>navigation.dispatch(CommonActions.reset({
                        index : 0,
                        routes : [{name : 'PostPage'}]
                    }))}
                    style={{ marginLeft: 30, marginRight: 5 }}>
                    <Text style={styles.ExitText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.PostText}>글 쓰기</Text>
                <TouchableOpacity style={styles.Button} onPress={() => { WritePost(Title, Content, navigation); }}>
                    <Text style={styles.ButtonText}>작성</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
                <TextInput style={styles.TitleInput} placeholder='제목' onChangeText={(Title) => setTitle(Title)}>

                </TextInput>
            </View>
            <View>
                <TextInput style={styles.TextInput} multiline={true} 
                textAlignVertical='top'
                placeholder='내용을 입력해주세요.' onChangeText={(Content) => setContent(Content)}>

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
        marginTop: 10,
        marginLeft: 10,
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
        width: 400,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius : 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
      },
});

export default Post;