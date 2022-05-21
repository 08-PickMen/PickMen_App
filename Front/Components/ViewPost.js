import React , {useState, useEffect, useCallbackt} from 'react';
import { View, Text, StyleSheet , TextInput, TouchableOpacity, Alert, Image, FlatList, RefreshControl} from 'react-native';
import 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import newPostData from './newPostData';
import { BackHandler } from 'react-native';
import 'react-navigation'
import { CommonActions } from '@react-navigation/native';
import data from './PostData';
import writeicon from '../icons/writing.png';
import deleteicon from '../icons/delete.png';
import { Button, Card} from 'react-native-paper';


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
async function restBoard(id, nickname, title, content) {
    if(id && title && content && nickname) {
        await AsyncStorage.setItem('Post_id', String(id));
        await AsyncStorage.setItem('title_id', String(title));
        await AsyncStorage.setItem('content_id', String(content));
        await AsyncStorage.setItem('nickname_id', String(nickname));
    }
}

async function DeleteToPost(navigation) {
    var data = await AsyncStorage.getItem('Post_id');
    DeletePost(navigation, data);
}



function ShowTab({navigation}) {
    const [checkstatus, setCheckstatus] = useState(false);
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

    function loadReply(id) {
            axios.get('http://10.0.2.2:8090/Reply/Get/'+Number(id)
                ).then(response => {
                    console.log(response.data.data)
                    setListTweets(response.data.data);
                }).catch(error => {
                console.log(error)
            })
    }

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
    
    
    const renderTweets = ({item}) => {
        return (
            <Card style = {{borderWidth : .5}}>
                <View style = {{flexDirection : 'row', marginTop : 10,}}>
                    <Image source={{uri : 'http://10.0.2.2:8090/getProfile?userid='+item.user.id}} style = {styles.ReplyImage}/>
                    <Text style = {styles.ReplyNickName}>{item.nickname}</Text>
                </View>
                <View>
                    <Text style = {styles.ReplyContent}>{item.content}</Text>
                </View>
                <View>
                    <Text style = {styles.ReplyCreateDate}>20{item.createDateTime}</Text>
                </View>
                <View>
                    <TouchableOpacity style = {{marginLeft : 'auto'}} onPress={()=>deleteReply(item.user.id, item.id, id)}>
                        <Image source= {deleteicon} style = {styles.ReplyDelete}/>
                    </TouchableOpacity>
                </View>
            </Card>
        )
    }

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
    saveCurrentId(user);
    restBoard(id, title, content, nickName);
 return(
        <View style ={{backgroundColor : '#fff', flex :1,}}>
            <View style= {{flexDirection:'row'}}>
                <Text style = {styles.Text}>게시글</Text>
                <ShowTab navigation={navigation}/></View>
                <View style={{
                    borderBottomColor : 'black',
                    borderBottomWidth : 1,
                }}></View>
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
                   <FlatList
                    data = {ListTweets}
                    renderItem = {renderTweets}
                    onEndReachedThreshold={0.6}
                   >
                   </FlatList>
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
        width : 300,
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
        marginTop : 10,
        marginLeft : 10,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'Jalnan',

    },
    ContentText: {
        color : "#a0a0a0",
        marginTop : 20, 
        marginLeft : 20,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'Jalnan',

    },
    CountText: {
        color : "black",
        marginTop : 20, 
        marginLeft : 'auto',
        marginRight : 20,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'Jalnan',

    },
    TitleText: {
        color : "black",
        marginTop : 20, 
        marginLeft : 20,
        marginBottom : 10,
        fontSize : 20,
        fontFamily : 'Jalnan',

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
        fontFamily : 'Jalnan',
        fontSize : 14,
        color : 'black'
    },
    ReplyCreateDate : {
        marginLeft : 20,
        marginTop : 15,
        marginBottom : 15,
        fontFamily : 'Jalnan',
        fontSize : 14,
        color : 'black'
    },
    ReplyNickName : {
        fontSize : 14,
        marginTop : 'auto',
        marginBottom : 'auto',
        marginLeft : 15,
        fontFamily : 'Jalnan',
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
    }
   });

export default ViewPost;