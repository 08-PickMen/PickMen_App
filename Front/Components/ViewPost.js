import React , {useState} from 'react';
import { View, Text, StyleSheet , TextInput, TouchableOpacity, Alert} from 'react-native';
import 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import newPostData from './newPostData';
import { BackHandler } from 'react-native';
import 'react-navigation'
import { CommonActions } from '@react-navigation/native';

async function loadBoard() {
    var data1 = await AsyncStorage.getItem('user_id');
    var data2 = await AsyncStorage.getItem('Compareid');
    console.log(data1, data2)
    if(data1 == data2){
        return true;
    }
}

 class ShowTab extends React.Component {
     render(){
         if(loadBoard()==true){
            return(
                <View>
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.Text}>수정</Text>
                    </TouchableOpacity>
                </View>
            ) 
    }
    return (
        <View></View>
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
    newPostData.length = 0;
    saveCurrentId(data[0].user);
    return(
            <View>
                <Text style = {styles.Text}>게시글</Text>
                <ShowTab/>
                <View style={{
                    borderBottomColor : 'black',
                    borderBottomWidth : 1,
                }}></View>
               <Text>
                   {JSON.stringify(data[0].title)}
               </Text>
               <Text>
                    {JSON.stringify(data[0].id)}  
               </Text>
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
    Button : {
        width : 80,
        height : 40,
        backgroundColor : "#27BAFF",
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
        fontSize : 15,
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