import React , {useState} from 'react';
import { View, Text, StyleSheet , TextInput, TouchableOpacity, Alert} from 'react-native';
import 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import newPostData from './newPostData';
import { BackHandler } from 'react-native';
import 'react-navigation'
import { CommonActions } from '@react-navigation/native';
import data from './PostData';

async function loadBoard() {
    var data1 = await AsyncStorage.getItem('user_id');
    var data2 = await AsyncStorage.getItem('Compareid');
    console.log(data1, data2)
    if(data1 == data2){
        return true
    }
    
}

async function DeletePost(navigation, id) {
    console.log(id)
    await axios.post('http://10.0.2.2:8090/board/delete',null,{ params: {
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
                onPress: () => {loadBoard(); navigation.dispatch(CommonActions.reset({
                    index : 0,
                    routes : [{name : 'PostPage'}]
                }))},

            }
        ]
    )
}

async function EditPost(navigation, id, title, content) {
    await axios.post('http://10.0.2.2:8090/board/delete',null,{ params: {
        id : parseInt(id),
        title : title,
        content : content,
    } }).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
    Alert.alert(
        '게시글이 수정 되었습니다',
        '',
        [
            {
                text: '확인',
                onPress: () => {loadBoard(); navigation.dispatch(CommonActions.reset({
                    index : 0,
                    routes : [{name : 'PostPage'}]
                }))},

            }
        ]
    )
}
async function restBoard(id, title, content) {
    if(id && title && content) {
        await AsyncStorage.setItem('Post_id', JSON.stringify(id));
        await AsyncStorage.setItem('title_id', JSON.stringify(title));
        await AsyncStorage.setItem('content_id', JSON.stringify(content));
    }
}

async function DeleteToPost(navigation) {
    var data = await AsyncStorage.getItem('Post_id');
    DeletePost(navigation, data);
}

async function EditToPost(navigation) {
    var data1 = await AsyncStorage.getItem('Post_id');
    var data2 = await AsyncStorage.getItem('title_id');
    var data3 = await AsyncStorage.getItem('content_id');
    EditPost(navigation, data1, data2, data3);
}

function ShowTab({navigation}) {
         if(loadBoard()){
            return(
                <View style={{
                    marginLeft : 'auto',
                    marginRight : 10,
                    flexDirection : 'row',
                    marginTop : 5,
                }}>
                    <TouchableOpacity style={styles.DeleteButton} onPress={()=> {
                        DeleteToPost(navigation);
                    }}>
                        <Text style={styles.ButtonText}>삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={()=> {
                        EditToPost(navigation);
                        AsyncStorage.removeItem('Post_id');
                        AsyncStorage.removeItem('title_id');
                        AsyncStorage.removeItem('content_id');
                    }}>
                        <Text style={styles.ButtonText}>수정</Text>
                    </TouchableOpacity>
                </View>
            ) 
    } else return (
        <View></View>
    )
}


function ViewPost({navigation}, newData) {
    async function saveCurrentId(user_id) {
        if(user_id)
            await AsyncStorage.setItem('Compareid', JSON.stringify(user_id));
    }
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    var data = []
    data = newPostData.slice();
    newPostData.length = 0;
    saveCurrentId(data[0].user);
    restBoard(data[0].id, data[0].title, data[0].content);
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
                    <Text style ={styles.TitleText}>
                        {JSON.stringify(data[0].title).replace(/\"/gi,"").replace(/\\n/gi,"")}
                    </Text>
               </View>
               <View>
                   <Text style = {styles.ContentText}>
                        {JSON.stringify(data[0].content).replace(/\"/gi,"").replace(/\\n/gi,"")}
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
        color : "black",
        marginTop : 10,
        marginLeft : 10,
        marginBottom : 10,
        fontSize : 15,
        fontFamily : 'Jalnan',

    },
    TitleText: {
        color : "#27BAFF",
        marginTop : 10,
        marginLeft : 10,
        marginBottom : 10,
        fontSize : 25,
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