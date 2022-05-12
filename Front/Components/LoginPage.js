import React , {useState} from 'react';
import { View, Text, StyleSheet , TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity } from 'react-native';
import 'react-navigation';
import axios  from 'axios';
import data from './PostData'
import newPostData from './newPostData';

function LoginPage({navigation}) {
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');

    async function saveUserId(user_id) {
        await AsyncStorage.setItem('user_id', JSON.stringify(user_id));
        var data = await AsyncStorage.getItem('user_id');
        console.log(data);
    }
    async function LoginAccess(email, password) {
       axios.post('http://10.0.2.2:8090/auth/loginProc',null,{ params: {
            username: email,
            password: password,
            email : email,
       }}).then(response => {
              if(response.data.status == 200){
                console.log(response.data.data.id)
                saveUserId(response.data.data.id);
                navigation.navigate('HomeScreen');
              }else{
                alert('아이디 또는 비밀번호가 틀렸습니다.');
                navigation.navigate('LoginPage');
              }
    }).catch(function(error){
        console.log(error)
    })
    }
    async function loadBoard() {
        await axios.get('http://10.0.2.2:8090/board/list')
        .then(response => {
            var count = parseInt(response.data.numberOfElements);
            count = count-1;
            for(count;count >=0; count--){
            data.push({
                id : response.data.content[count].id,
                title : response.data.content[count].title,
            },)
        }
        }).catch(error => {
            console.log(error)
        })
    }
    return(
        data.length = 0,
            <View>
                <View>
                    <Text style = {styles.Text}>
                        PickMen 로그인하기
                    </Text>
                </View>
                <View>
                <TextInput style = {styles.TextInput} placeholder = "Email Address" onChangeText={(UserEmail)=> setEmail(UserEmail)}/>
                <TextInput secureTextEntry={true} style = {styles.TextInput} placeholder = "Password" onChangeText={(password)=> setPassword(password)}/>
                </View>
                <TouchableOpacity style={styles.startButton} 
                    onPress = {()=> {
                        LoginAccess(email, password);
                        loadBoard();
                        navigation.navigate('HomeScreen');
                        data.length = 0;                    
                    }}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>  
            </View>
    )
}
const styles = StyleSheet.create({
   startButton:{
    width : 280, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 100,
    borderRadius:5,

    backgroundColor : "#27BAFF"
   },
   Text:{
       color : "#27BAFF",
       textAlign : "center",
       marginTop : 150,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 28,
       marginBottom : 60,
       fontFamily : 'Jalnan',
   },
   ButtonText:{
    color : "#FFFFFF",
    textAlign : "center",
    paddingLeft : 10,
    paddingRight : 10,
    marginTop : 4,
    fontSize : 18,
    fontFamily : 'Jalnan',
},
    TextInput: {
        width : 320,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 20
    },
  });

export default LoginPage;