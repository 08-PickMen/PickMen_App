import React , {useState} from 'react';
import { View, Text, StyleSheet , Image, Platform} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import 'react-navigation'
import status from '../utils/status';

async function DuplicateCheck(nickName) {
    await axios.get('http://10.0.2.2:8090/DuplicateCheck',{
        params : {
            nickname : nickName
        }
    }).
    then(response => {
        if(response.status == 200) {
            var data = nickName;
            AsyncStorage.setItem('nickname', data);
            AsyncStorage.setItem('status', 'true');
        } else {
            console.log(response.data)
        }
    }).catch(error => {
        console.log(error)
    })
}

async function ImageSave(image) {
    await AsyncStorage.setItem('image', JSON.stringify(image));
}


async function ImageCheck() {
    await AsyncStorage.removeItem('image');
}

function GradeAccess({navigation}) {
    var data = new FormData();
    const [nickName, setNickName] = useState('');
    const [image, setImage] = React.useState(null);
    const [profileImage, setprofileImage] = React.useState(null);
    const [checkText, setCheckText] = React.useState('');
    const [CorrectText, setCorrectText] = React.useState('');
    const [Gradefile, setGradefile] = React.useState('');
    async function CheckStatus() {
        var data = await AsyncStorage.getItem('status');
        status.length = 0;
        status.push(data);
    }
    async function ImageUpload() {
         launchImageLibrary({}, async function(response){
             if(response.assets[0].uri) {
                 console.log(response);
                    setImage(response.assets[0].uri);
             }
             var data = new FormData();
                data.append('file', {
                    uri : Platform.OS === 'android' ? response.assets[0].uri : 'file://' + response.assets[0].uri,
                    name : 'image.jpg',
                    type : 'image/jpeg'
                });
                axios.post('http://10.0.2.2:8090/certificate', data, {
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
             }).then(response => {
                console.log(response.data);
            })
        })

    }
    async function ProfileUpload() {
        launchImageLibrary({}, response => {
            if(response.assets[0].uri) {
                console.log(response);
                setprofileImage(response.assets[0].uri);
            }
              data.append('profile', {
                   uri :  response.assets[0].uri,
                   name : 'image.jpg',
                   type : 'image/jpeg',
               });
            console.log(data)
            console.log(data)
            ImageCheck();
            ImageSave(data);
       })

   }
    return(
            <View>
                <View style = {styles.Introduce}>
                    <Text style = {styles.Introduce}>개인정보 입력</Text>
                </View>
                <View>
                    <Text style = {styles.Text}>닉네임</Text>
                </View>
                <View style = {{flexDirection : 'row'}}>
                <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요." onChangeText={(nickName)=> setNickName(nickName)}/>
                <TouchableOpacity style={styles.CheckButton} onPress = {()=> {DuplicateCheck(nickName); CheckStatus(); {
                    if(status[0]=='true') {
                        setCorrectText('사용가능한 닉네임입니다.');
                    }
                }}}>
                        <Text style={styles.ButtonText}>중복인증</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <Text style = {styles.CorrectText}>{CorrectText}</Text>
                </View>
                <View>
                    <Text style = {styles.Text}>성적표</Text>
                </View>
                <View>
                </View>
                <View style = {{flexDirection : 'row'}}>
                <TextInput style = {styles.TextInput} placeholder = "성적표를 업로드 해주세요." editable = {false}/>
                <TouchableOpacity style={styles.CheckButton}
                onPress={()=>{ImageUpload(); {
                   
                }}}>
                        <Text style={styles.ButtonText}>업로드</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <Text style = {styles.Text}>프로필 사진</Text>
                </View>
                <View>
                </View>
                <View style = {{flexDirection : 'row'}}>
                <TextInput style = {styles.TextInput} placeholder = "프로필을 업로드 해주세요." editable = {false}/>
                <TouchableOpacity style={styles.CheckButton}
                onPress={()=>{ProfileUpload();}}>
                        <Text style={styles.ButtonText}>업로드</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.CorrectButton}
                        onPress ={()=>{navigation.navigate('Information_Mento')}}>
                        <Text style={styles.ButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
   CorrectButton:{
    width : 280, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 100,
    borderRadius:5,
    backgroundColor : "#27BAFF"
   },
   AccessButton:{
    width : 220, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 50,
    marginRight : 'auto', 
    borderRadius:5,
    backgroundColor : "#27BAFF"
   },
   CheckButton:{
    width : 100, 
    height : 40,
    paddingTop : 5, 
    marginRight : 'auto', 
    marginTop : 12,
    borderRadius:5,
    backgroundColor : "#27BAFF"
   },
   CorrectText: {
    color : "#27BAFF",
    fontSize : 15,
    fontFamily : 'Jalnan',
    marginLeft : 40,
   },
   FailText: {
    color : '#F00',
    fontSize : 15,
    fontFamily : 'Jalnan',
    marginLeft : 40,
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
    width : 240,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius : 5,
    marginLeft : 40,
    marginRight : 'auto',
    marginBottom : 20
  },
   Text:{
       marginTop : 5,
       paddingLeft : 10,
       paddingRight : 10,
       fontWeight : 'bold',
       fontSize : 15,
       fontFamily: 'SCDream1',
       marginLeft : 35,
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

export default GradeAccess;