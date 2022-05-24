import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import 'react-navigation'

function Information_Mento({navigation}) {
    var [value, setValue] = useState('');
    var [Password, setPassword] = useState('');
    var [correctPassword, setCorrectPassword] = useState('');
    var [correctText, setCorrectText] = useState('');
    var [sendEmail, setSendEmail] = useState('');
    var [sendPassword, setSendPassword] = useState('');
    var [count, setCount] = useState(0);
    var [userName, setUserName] = useState('');

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
    async function register(username, email, password) {
        var nickname = await AsyncStorage.getItem('nickname');
        var data2 = await AsyncStorage.getItem('image');
        var changeImage = JSON.parse(data2)._parts
        var lecture1 = await AsyncStorage.getItem('Lecture1');
        var lecture2 = await AsyncStorage.getItem('Lecture2');
        var departmentValue = await AsyncStorage.getItem('departmentValue');
        var schoolValue = await AsyncStorage.getItem('schoolValue');
        var lectureList = [Number(lecture1), Number(lecture2)]
        var introduceMyself = await AsyncStorage.getItem('introduceMyself');
        var livingWhere = await AsyncStorage.getItem('livingWhere');
        var mentoringContents = await AsyncStorage.getItem('mentoringContents');

        var InputImage = new FormData();
        var time = Date.now();
        InputImage.append('profile', {
            uri :  changeImage[0][1].uri,
            name : "image" + time +".jpg",
            type : 'image/jpeg',
        })
        await axios.post('http://10.0.2.2:8090/signup/mentor',InputImage,{
            headers : {
                "Content-Type" : "multipart/form-data",
            },
            params : {
                username : username,
                password : password,
                nickname : nickname,
                email : email,
                major : Number(departmentValue),
                school : Number(schoolValue),
                lectureList : lectureList.join(','),
                introduceMyself : introduceMyself,
                livingWhere : livingWhere,
                mentoringContents : mentoringContents,
            }
        }
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
                    <Text style = {styles.Text}>ID</Text>
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요." onChangeText={(username)=>{setUserName(username)}}/>
                </View>
                <View>
                    <Text style = {styles.Text}>이메일 주소</Text>
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
                            setCount(1);
                        }
                        else {
                            setCorrectText('비밀번호가 일치하지 않습니다.');
                            setCount(0);
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
                            if(count==1) {
                            register(userName, sendEmail, sendPassword);
                            navigation.navigate('RegisterComplete')
                            }
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
    marginTop : 140,
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
    color : "red",
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
    color : "#27BAFF",
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
    width : 320,
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

export default Information_Mento;