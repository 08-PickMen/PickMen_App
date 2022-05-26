import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
<<<<<<< HEAD:Front/Components/Information.js
import Imagedata from './ImageData';
=======
import 'react-navigation'
>>>>>>> b619266d573ef44b1680d5338d6b7833ab9bb932:Front/Components/Signup/Mentee/Information_Mentee.js

function Information() {
    var [value, setValue] = useState('');
    var [Password, setPassword] = useState('');
    var [correctPassword, setCorrectPassword] = useState('');
    var [correctText, setCorrectText] = useState('');
    var [sendEmail, setSendEmail] = useState('');
    var [sendPassword, setSendPassword] = useState('');

    var count = 0;
    async function returnEmail() {
        var data = await AsyncStorage.getItem('email');
        setValue(data)
        setSendEmail(data)
    }
    async function savePassword(password) {
        await AsyncStorage.setItem('password',String(password));
        var data = await AsyncStorage.getItem('password');
        setSendPassword(data)
    }
<<<<<<< HEAD:Front/Components/Information.js
    async function register(email, password) {
        var nickname = await String(AsyncStorage.getItem('nickname'));
        console.log(nickname, Imagedata)
        await axios.post('http://10.0.2.2:8090/signup/mentee',Imagedata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }, 
            {
                username : email,
                email: email,
                password: password,
                nickname: nickname,
            }
        
=======
    async function register(username, email, password) {
        var nickname = await AsyncStorage.getItem('nickname');
        var data2 = await AsyncStorage.getItem('image');
        var lecture1 = await AsyncStorage.getItem('lecture1');
        var lecture2 = await AsyncStorage.getItem('lecture2');
        const ids = [Number(lecture1), Number(lecture2)];
        console.log(ids.join(','))
        var changeImage = JSON.parse(data2)._parts
        var InputImage = new FormData();
        console.log(password);
        InputImage.append('profile', {
            uri :  changeImage[0][1].uri,
            name : "image.jpg",
            type : 'image/jpeg',
        })
        console.log(username)
        await axios.post('http://10.0.2.2:8090/signup/mentee',InputImage,{
            headers : {
                "Content-Type" : "multipart/form-data",
            },
            params : {
                username : username,
                password : password,
                nickname : nickname,
                email : email,
                lectureList : ids.join(','),
            },
        }
>>>>>>> b619266d573ef44b1680d5338d6b7833ab9bb932:Front/Components/Signup/Mentee/Information_Mentee.js
           ).then(function(response) {
            console.log(response.data)
            AsyncStorage.removeItem('image');
        })
    }
    returnEmail();
    return(
            <View>
                <View style = {styles.Introduce}>
                    <Text style = {styles.Introduce}>개인정보 입력</Text>
                </View>
                <View>
                    <Text style = {styles.Text}>이름</Text>
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요."/>
                </View>
                <View>
                    <Text style = {styles.Text}>주민등록번호</Text>
                </View>
                <View style = {{flexDirection : 'row', marginLeft : 'auto', marginRight : 'auto', marginBottom : 20}}>
                    <TextInput style = {styles.RRNumberText} placeholder = "내용을 입력해주세요."/>
                    <Text style = {styles.RRText}>-</Text>
                    <TextInput style = {styles.RRNumberText} placeholder = "내용을 입력해주세요."/>
                </View>
                <View>
                    <Text style = {styles.Text}>이메일 주소(ID)</Text>
                    <TextInput style = {styles.TextInput} placeholder = {String(value)} editable={false} selectTextOnFocus={false}
                    backgroundColor ='gray' placeholderTextColor='white'/>
                </View>
                <View>
                    <Text style = {styles.Text}>비밀번호 입력</Text>
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요." onChangeText={Password => setPassword(Password)}/>
                </View>
                <View>
                    <Text style = {styles.Text}>비밀번호 재입력</Text>
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요."onChangeText={CorrectPassword => {
                        setCorrectPassword(CorrectPassword)
                    }}/>
                </View>
                <View style={{flexDirection : 'row'}}>
                    <Text style = {styles.CorrectText}>{correctText}</Text>
                    <TouchableOpacity style={styles.CorrectButton}
                    onPress = {() =>{
                        if(Password === correctPassword&& Password !== ''){
                            setCorrectText('비밀번호가 일치합니다.');
                            count = 1;
                        }
                        else {
                            setCorrectText('비밀번호가 일치하지 않습니다.');
                        }
                        if(count==0) {
                            styles.CorrectText = styles.FailText;
                        } else {
                            styles.CorrectText = styles.backupText;
                        }
                        savePassword(Password);
                    }}>
                        <Text style={styles.ButtonText}>비밀번호 확인</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.Button}
                    onPress={()=> {
<<<<<<< HEAD:Front/Components/Information.js
                        console.log(sendEmail, sendPassword);
                            register(sendEmail, sendPassword);
=======
                            if(count==1) {
                                register(userName, sendEmail, sendPassword);
                                navigation.navigate('RegisterComplete')
                            }
>>>>>>> b619266d573ef44b1680d5338d6b7833ab9bb932:Front/Components/Signup/Mentee/Information_Mentee.js

                    }}>
                        <Text style={styles.ButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    Button:{
    width : 280, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 60,
    borderRadius:5,
    backgroundColor : "#27BAFF"
   },
   CorrectButton:{
    width : 110, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 40, 
    borderRadius:5,
    backgroundColor : "#27BAFF"
   },
   CorrectText: {
    color : "#27BAFF",
    fontSize : 15,
    fontFamily : 'Jalnan',
    marginTop : 10,
    marginLeft : 50
   },
   backupText: {
    color : "#27BAFF",
    fontSize : 15,
    fontFamily : 'Jalnan',
    marginTop : 10,
    marginLeft : 50
   },
   FailText: {
    color : "#ff0000",
    fontSize : 15,
    fontFamily : 'Jalnan',
    marginTop : 10,
    marginLeft : 20
   },
   ButtonText:{
    color : "white",
    textAlign : "center",
    marginTop : 5,
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight : 'bold',
    fontSize : 15,
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
  RRNumberText: {
    width : 135,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius : 5,
  },
   RRText:{
       marginTop : 20,
       paddingLeft : 10,
       paddingRight : 10,
       fontWeight : 'bold',
       fontSize : 15,
       fontFamily: 'SCDream1',
   },
   Text:{
       marginTop : 5,
       paddingLeft : 10,
       paddingRight : 10,
       fontWeight : 'bold',
       fontSize : 15,
       fontFamily: 'SCDream1',
       marginLeft : 50,
       marginRight : 100
   },
   Introduce:{
    color : "black",
    textAlign : "center",
    marginRight : 'auto',
    marginTop : 10,
    marginBottom : 10,
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight : 'bold',
    fontSize : 25,
}
  });

export default Information;