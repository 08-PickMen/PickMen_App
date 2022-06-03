import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet , TextInput, TouchableOpacity, Alert, Image, FlatList, RefreshControl} from 'react-native';
import 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import newPostData from '../../localData/newPostData';
import { BackHandler } from 'react-native';
import 'react-navigation'
import { CommonActions } from '@react-navigation/native';
import data from './PostData';
import writeicon from '../../../icons/writing.png';
import deleteicon from '../../../icons/delete.png';
import {Card, TouchableRipple} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

// 전체 게시글 리스트를 불러오는 함수
async function loadPost() {
    await axios.get('http://10.0.2.2:8090/post/getPost').then(response => {
        var count = parseInt(response.data.totalElements);
        if(count == 1) {
            data.length = 0;
            data.push({
                id : response.data.content[0].id,
                title : response.data.content[0].title,
                user : response.data.content[0].user.id,
                content : response.data.content[0].content,
                count : response.data.content[0].count,
                nickname : response.data.content[0].user.nickname,
            },)
        }
        else if(count > 1){
            count = count-1;
            data.length = 0;
            for(count;count >=0; count--){
            data.push({
                id : response.data.content[count].id,
                title : response.data.content[count].title,
                user : response.data.content[count].user.id,
                content : response.data.content[count].content,
                count : response.data.content[count].count,
                nickname : response.data.content[count].user.nickname,
            },)
    }
    }
    }).catch(error => {
        console.log(error)
    })
}
const createRoom = (mentor_id) => {
    axios.post('http://10.0.2.2:8090/chat/room/createRoom/'+Number(mentor_id)).then(response => {
      console.log(response.data)
    })
}
// 게시글 삭제 기능
async function DeletePost(navigation, id) {
    await axios.post('http://10.0.2.2:8090/post/deletePost',null,{ params: {
        id : parseInt(id),
    } }).then(response => {
    }).catch(error => {
        console.log(error)
    })
    var count = parseInt(data.length);
    count = count-1;
    for(count; count>=0; count--){
        if(data[count].id == id){
            data.splice(count, 1);
        }
    }
    Alert.alert(
        '게시글이 삭제되었습니다',
        '',
        [
            {
                text: '확인',
                onPress: () => { navigation.dispatch(CommonActions.reset({
                    index : 0,
                    routes : [{name : 'PostPage'}]
                }))},

            }
        ]
    )
}
// 게시글 수정 페이지로 이동
async function EditPost(navigation) {
    Alert.alert(
        '게시글을 수정하겠습니다.',
        '',
        [
            {
                text: '확인',
                onPress: () => {loadPost(); navigation.dispatch(CommonActions.reset({
                    index : 0,
                    routes : [{name : 'EditPost'}]
                }))},

            }
        ]
    )
}
// id, title, content, count, nickname 정보를 저장
async function restBoard(id, nickname, title, content) {
    if(id && title && content && nickname) {
        await AsyncStorage.setItem('Post_id', String(id));
        await AsyncStorage.setItem('title_id', String(title));
        await AsyncStorage.setItem('content_id', String(content));
        await AsyncStorage.setItem('nickname_id', String(nickname));
    }
}

// 게시글 id를 저장하고 게시글 삭제 페이지로 이동
async function DeleteToPost(navigation) {
    var data = await AsyncStorage.getItem('Post_id');
    DeletePost(navigation, data);
}

// 현재 접속한 user id와 게시글의 user id가 같은지 확인하고 같으면 수정, 삭제 가능
function ShowTab({navigation}) {
    const [checkstatus, setCheckstatus] = useState(false);
    // 현재 접속한 user id와 게시글의 user id가 같은지 확인
    async function loadBoard() {
        var data1 = await AsyncStorage.getItem('user_id');
        var data2 = await AsyncStorage.getItem('Compareid');
        if(data1 == data2) {
            setCheckstatus(true);
        } else {
            setCheckstatus(false);
        }
    }
    loadBoard(checkstatus);
         if(checkstatus == true){
            return(
                <View style={{
                    marginLeft : 'auto',
                    marginRight : 10,
                    flexDirection : 'row',
                    marginTop : 5,
                }}>
                    <TouchableOpacity onPress={()=> {
                        DeleteToPost(navigation);
                    }}>
                        <Image source= {deleteicon} style = {{width : 55, height : 55, marginRight : 20,}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {
                        EditPost(navigation);

                    }}>
                        <Image source= {writeicon} style = {{width : 45, height : 45,marginTop : 5,}}/>
                    </TouchableOpacity>
                </View>
            ) 
    }else {
        return (
            <View>
            </View>
        )
    }
}

// 게시글 제목, 내용, 작성자, 조회수, 작성일자를 보여줌
function ViewPost({navigation}) {
    async function saveCurrentId(user_id) {
        await AsyncStorage.setItem('Compareid', String(user_id));
    }
    
    const [tweets, setTweets] = useState(null);
    var [refreshing, setRefreshing] = useState(false);
    var [nickName, setNickName] = useState('');
    var [title, setTitle] = useState('');
    var [content, setContent] = useState('');
    var [id, setId] = useState('');
    var [count, setCount] = useState(0);
    var [user, setUser] = useState('');
    const [ListTweets, setListTweets] = useState([]);
    // 댓글 목록을 불러옴
    function loadReply(id) {
            axios.get('http://10.0.2.2:8090/Reply/Get/'+Number(id)
                ).then(response => {
                    console.log(response.data)
                    setListTweets(response.data.data);
                }).catch(error => {
                console.log(error)
            })
    }
    // 댓글 작성 기능
    function subscribeReply(post_id,content,navigation) {
        axios.post('http://10.0.2.2:8090/Reply/Post/'+post_id,null,{ params: {
            content : content,
        }}).then(response => {
        })
        .catch(error => {
        })
        Alert.alert(
            '댓글이 작성되었습니다',
            '',
            [
                {
                    text: '확인',
                    onPress: () => {loadReply(post_id)},
    
                }
            ]
        )
    }
    // 댓글 삭제 기능
    async function deleteReply(user_id, Reply_id, post_id) {
        var data = await AsyncStorage.getItem('user_id');
        if(user_id==data) {
            axios.post('http://10.0.2.2:8090/Reply/Delete/'+Reply_id, null, { params : {
                postId : post_id,
            }}).then(response => {
                console.log(response.data)
            }).catch(error => {
    
            })
            Alert.alert(
                '댓글이 삭제되었습니다',
                '',
                [
                    {
                        text: '확인',
                        onPress: () => {loadReply(post_id)},
        
                    }
                ]
            )
        } else {
            Alert.alert(
                '댓글 작성자가 아닙니다.',
                '',
                [
                    {
                        text: '확인',
                        onPress: () => {},
        
                    }
                ]
            )
        }
    }
    
    // 댓글 내용을 render 하는 Code
    const renderTweets = ({item}) => {
        return (
            <Card style = {{borderWidth : .5}}>
                <View style = {{flexDirection : 'row', marginTop : 10,}}>
                        <TouchableOpacity onPress={()=>{
                            if(item.role =='MENTOR') {
                                navigation.navigate('MentorProfileDetailFromReply',{item_id : item.user_id, item_lectureName1 : item.lectureName1,item_lectureName2 : item.lectureName2, item_majorName : item.majorName})
                            } else {
                                Alert.alert(
                                    '멘티와 채팅방을 생성하시겠습니까?',
                                    '',
                                    [
                                        {
                                            text: '확인',
                                            onPress: () => {createRoom(item.user_id);navigation.dispatch(CommonActions.reset({
                                              index : 0,
                                              routes : [{name : 'PostPage'}],
                                          }))},
                                        },
                                        {
                                            text: '취소',
                                            onPress: () => {navigation.dispatch(CommonActions.reset({
                                                index : 0,
                                                routes : [{name : 'PostPage'}]
                                            }))},
                                        }
                                    ]
                                )
                            }
                            }}>
                            <FastImage source={{uri : 'http://10.0.2.2:8090/getProfile?userid='+item.user_id, cache : FastImage.cacheControl.web}} style = {styles.ReplyImage}/>
                        </TouchableOpacity>
                    <Text style = {styles.ReplyNickName}>{item.nickname}</Text>
                </View>
                <View>
                    <Text style = {styles.ReplyContent}>{item.content}</Text>
                </View>
                <View>
                    <Text style = {styles.ReplyCreateDate}>{item.createDateTime}</Text>
                </View>
                <View>
                    <TouchableOpacity style = {{marginLeft : 'auto'}} onPress={()=>deleteReply(item.user_id, item.id, id)}>
                        <Image source= {deleteicon} style = {styles.ReplyDelete}/>
                    </TouchableOpacity>
                </View>
            </Card>
        )
    }
    // 게시글 제목, 내용, 작성자, 조회수, 작성일자를 List에 저장
    useEffect(() => {
        var isMount = true;
        try{
            if(newPostData[0]){
                setNickName(newPostData[0].nickname);
                setTitle(newPostData[0].title);
                setContent(newPostData[0].content);
                setId(newPostData[0].id);
                setCount(newPostData[0].count);
                setUser(newPostData[0].user);
                axios.get('http://10.0.2.2:8090/Reply/Get/'+Number(newPostData[0].id)
                    ).then(response => {
                        setListTweets(response.data.data);
                    }).catch(error => {
                        console.log(error)
                    })
                newPostData.length = 0;
            }
        }catch(error){
            console.log(error)
        }
        return () => {
            isMount = false;
        }
    },[]);
    // 현재 Post에서 user id와 Post 내용을 저장하는 Code
    saveCurrentId(user);
    restBoard(id, title, content, nickName);
 return(
        // Post 전체 UI
        <View style ={{backgroundColor : '#27BAFF', flex :1,}}>
            <View style = {styles.PageStyle}>
            <View style= {{flexDirection:'row'}}>
                <Text style = {styles.Text}>게시글</Text>
                <ShowTab navigation={navigation}/></View>
                <View>
                    <View>
                        <Text style = {{marginTop : 20, marginLeft : 20}}>작성자 : {nickName}  
                          </Text>
                    </View>
               </View>
                <View>
                    <Text style ={styles.TitleText}>
                        {title}
                    </Text>
               </View>
               <View>
                   <Text style = {styles.ContentText}>
                        {content}
                   </Text>
               </View>
               <View>
                   <Text style = {styles.CountText}>
                        조회수  {count}
                   </Text>
               </View>
               <View style = {{flexDirection : 'row'}}>
                   <TextInput style = {styles.TextInput} onChangeText = {text => setTweets(text)}value = {tweets}></TextInput>
                   <TouchableOpacity style = {{marginTop : 12,marginRight : 10,width : 70, height : 40, backgroundColor : '#27BAFF', borderRadius : 5}}
                        onPress = {()=>{setTweets(''); subscribeReply(id,tweets,navigation);}}>
                       <Text style = {{color : '#fff',fontFamily : 'Jalnan', marginLeft : 'auto', marginRight : 'auto',marginTop : 'auto', marginBottom : 'auto'}}>작성</Text>
                   </TouchableOpacity>
               </View>
                   <FlatList // 댓글 리스트
                    data = {ListTweets}
                    renderItem = {renderTweets}
                    onEndReachedThreshold={0.6}
                   >
                   </FlatList>
                   </View>
            </View>

    )
}
const styles = StyleSheet.create({
     TitleInput: {
         width : 350,
         height: 40,
         margin: 12,
         borderWidth: 1,
         padding: 10,
         borderRadius : 5,
         marginLeft : 'auto',
         marginRight : 'auto',
         marginBottom : 20
     },
     TextInput: {
        width : 260,
        margin: 12,
        height : 40,
        borderWidth: 1,
        borderColor : "#a0a0a0",
        borderRadius : 5,
        marginLeft : 20,
        marginBottom : 20

    },
    Text: {
        color : "#27BAFF",
        marginTop : 20,
        marginLeft : 20,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'NanumSquareRoundB',

    },
    ContentText: {
        color : "#a0a0a0",
        marginTop : 20, 
        marginLeft : 20,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'NanumSquareRound',

    },
    CountText: {
        color : "black",
        marginTop : 20, 
        marginLeft : 'auto',
        marginRight : 20,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'NanumSquareRoundB',

    },
    TitleText: {
        color : "black",
        marginTop : 20, 
        marginLeft : 20,
        marginBottom : 10,
        fontSize : 20,
        fontFamily : 'NanumSquareRoundB',

    },
    Button : {
        width : 70,
        height : 35,
        backgroundColor : "#27BAFF",
        borderColor : 'black',
        borderRadius : 10,
        marginLeft : 'auto',
        marginRight : 10,
    },
    DeleteButton : {
        width : 70,
        height : 35,
        backgroundColor : "red",
        borderColor : 'black',
        borderRadius : 10,
        marginLeft : 'auto',
        marginRight : 10,
    },
    ButtonText: {
        color : "white",
        marginTop : 10,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 10,
        fontSize : 12,
        fontFamily : 'Jalnan',

    },
    ExitText: {
        color : "black",
        marginTop : 10,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'Jalnan',

    },
    AnotherText: {
        color : "#27BAFF",
        marginTop : 20,
        marginLeft : 30,
        fontSize : 15,
        fontFamily : 'Jalnan',

    },
    PostText: {
        color : "#27BAFF",
        marginTop : 10,
        marginLeft : 30,
        fontSize : 15,
        fontFamily : 'Jalnan',
    },
    ReplyContent : {
        marginLeft : 20,
        marginTop : 15,
        fontFamily : 'NanumSquareRoundB',
        fontSize : 14,
        color : 'black'
    },
    ReplyCreateDate : {
        marginLeft : 20,
        marginTop : 15,
        marginBottom : 15,
        fontFamily : 'NanumSquareRoundB',
        fontSize : 14,
        color : 'black'
    },
    ReplyNickName : {
        fontSize : 14,
        marginTop : 'auto',
        marginBottom : 'auto',
        marginLeft : 15,
        fontFamily : 'NanumSquareRoundB',
        color : 'black'
    },
    ReplyImage : {
        width : 40,
        height : 40,
        borderRadius : 40,
        marginLeft : 15,
    },
    ReplyDelete : {
        width : 35,
        height : 35,
        marginRight : 10,
        marginLeft : 'auto',
        marginBottom : 20,
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

export default ViewPost;