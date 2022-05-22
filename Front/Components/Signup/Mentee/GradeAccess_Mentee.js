import React ,{useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import 'react-navigation'
import axios from 'axios';
import status from '../../../utils/status'

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
        }
    }).catch(error => {
        console.log(error)
    })
}
async function ImageSave(image) {
    await AsyncStorage.setItem('image', JSON.stringify(image));
}

async function ImageLoad() {
    var data = await AsyncStorage.getItem('image');
    console.log(data);
}
function GradeAccess_Menti({navigation}) {
    
    var data = new FormData();
    const [nickname, setNickname] = useState('');
    const [image, setImage] = useState(null);
    const [profileImage, setprofileImage] = useState('');
    const [textImage, setTextImage] = useState('');
    const [CorrectText, setCorrectText] = useState('');
    async function CheckStatus() {
        var data = await AsyncStorage.getItem('status');
        status.length = 0;
        status.push(data);
    }
    async function ImageUpload() {
        launchImageLibrary({}, response => {
            if(response.assets[0].uri) {
                console.log(response);
                   setImage(response.assets[0].uri);
                   setprofileImage(response.assets[0].fileName.substring(0, 30)+'...');
            } 
              data.append('profile', {
                   uri :  response.assets[0].uri,
                   name : 'image.jpg',
                   type : 'image/jpeg',
               });
            console.log(data)
            console.log(data)
            ImageSave(data);
            ImageLoad();
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
                <View style = {{flexDirection : 'row',}}>
                <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요." onChangeText={(NickName)=>setNickname(NickName)}/>
                <TouchableOpacity style={styles.CheckButton}
                onPress= {
                    ()=>{DuplicateCheck(nickname);
                        CheckStatus(); {
                            console.log(status[0])
                            if(status[0]=='true') {
                                setCorrectText('사용가능한 닉네임입니다.');
                            }
                        }
                    }
                }>
                        <Text style={styles.ButtonText}>중복인증</Text>
                </TouchableOpacity>
                </View>
                 <View>
                    <Text style = {styles.CorrectText}>{CorrectText}</Text>
                </View>
                <View>
                    <Text style = {styles.Text}>프로필 사진</Text>
                </View>
                <View>
                </View>
                <View style = {{flexDirection : 'row'}}>
                <TextInput style = {styles.TextInput} value = {profileImage} editable={false} maxLength={33}/>
                <TouchableOpacity style={styles.CheckButton}
                onPress={()=>{ImageUpload();}}>
                        <Text style={styles.ButtonText}>업로드</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.CorrectButton}
                        onPress={()=> navigation.navigate('Information_Mentee')}>
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
    marginTop : 220,
    borderRadius:5,
    backgroundColor : "#27BAFF"
   },
   CorrectText: {
    color : "#27BAFF",
    fontSize : 15,
    fontFamily : 'Jalnan',
    marginLeft : 50,
    marginBottom : 40,
   },
   AccessButton:{
    width : 320, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 30,
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

export default GradeAccess_Menti;