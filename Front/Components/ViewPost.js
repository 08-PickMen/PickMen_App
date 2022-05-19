import React , {useState} from 'react';
import { View, Text, StyleSheet , TextInput, TouchableOpacity, Alert, Image} from 'react-native';
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


async function DeletePost(navigation, id) {
    await axios.post('http://10.0.2.2:8090/post/deletePost',null,{ params: {
        id : parseInt(id),
    } }).then(response => {
        console.log(response.data)
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
                onPress: () => {loadBoard(); navigation.dispatch(CommonActions.reset({
                    index : 0,
                    routes : [{name : 'EditPost'}]
                }))},

            }
        ]
    )
}
async function restBoard(id, nickname, title, content) {
    if(id && title && content) {
        await AsyncStorage.setItem('Post_id', JSON.stringify(id));
        await AsyncStorage.setItem('title_id', JSON.stringify(title));
        await AsyncStorage.setItem('content_id', JSON.stringify(content));
        await AsyncStorage.setItem('nickname_id', JSON.stringify(nickname));
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
        console.log(data1, data2)
        if(data1 == data2) {
            setCheckstatus(true);
        } else {
            setCheckstatus(false);
        }
    }
    loadBoard(checkstatus);
    console.log(checkstatus)
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


function ViewPost({navigation}, newData) {
    async function saveCurrentId(user_id) {
        await AsyncStorage.setItem('Compareid', JSON.stringify(user_id));
    }
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    var data = []

    data = newPostData.slice();
    saveCurrentId(newPostData[0].user);
    newPostData.length = 0;
    restBoard(data[0].id, data[0].title, data[0].content, data[0].nickname);
    return(
        <View>
            <View style= {{flexDirection:'row'}}>
                <Text style = {styles.Text}>게시글</Text>
                <ShowTab navigation={navigation}/></View>
                <View style={{
                    borderBottomColor : 'black',
                    borderBottomWidth : 1,
                }}></View>
                <View>
                    <View>
                        <Text style = {{marginTop : 20, marginLeft : 20}}>작성자 : {' '}  
                          {JSON.stringify(data[0].nickname).replace(/\"/gi,"").replace(/\\n/gi,"")}</Text>
                    </View>
               </View>
                <View>
                    <Text style ={styles.TitleText}>
                        {JSON.stringify(data[0].title).replace(/\"/gi,"").replace(/\\n/gi,"")}
                    </Text>
               </View>
               <View>
                   <Text style = {styles.ContentText}>
                        {JSON.stringify(data[0].content).replace(/\"/gi,"").replace(/\\n/gi,"")}
                   </Text>
               </View>
               <View>
                   <Text style = {styles.CountText}>
                        조회수  {JSON.stringify(data[0].count).replace(/\"/gi,"").replace(/\\n/gi,"")}
                   </Text>
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
        width : 350,
        height: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        marginLeft : 'auto',
        marginRight : 'auto',
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

    }
   });

export default ViewPost;