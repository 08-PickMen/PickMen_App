import React from 'react';
import {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import 'react-navigation'
import SendMail from '../utils/SendMailService';



function Certify({navigation}) {
    const [UserEmail, setState] = useState('');
    const [InfoText, setMailText] = useState('');
    return(
            <View>
                <View style = {styles.Introduce}>
                    <Text style = {styles.Introduce}>인증하기</Text>
                </View>
                <TextInput style = {styles.TextInput} placeholder = "email을 입력해주세요"
                onChangeText={UserEmail=> setState(UserEmail)}/>
                <TouchableOpacity style={styles.CertifyButton}
                    onPress={()=>{SendMail(UserEmail); setMailText('인증번호가 전송되었습니다');}}>
                    <Text style={styles.Text}>인증번호 전송</Text>
                </TouchableOpacity>
                <Text style={styles.CorrectMailText}>{InfoText}</Text>
                <TextInput style = {styles.TextInput} placeholder = "인증번호를 입력해주세요"/>
                <TouchableOpacity style={styles.CorrectButton}
                 onPress = {() => navigation.navigate('Test')}>
                    <Text style={styles.Text}>확인</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
   CertifyButton:{
    width : 300, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 2.5,
    borderRadius: 5,
    backgroundColor : "#27BAFF",
    marginBottom : 10
   },
   CorrectMailText: {
       color : "#27BAFF",
       marginTop : 5,
       marginLeft : 60,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 15,
       fontFamily: 'Jalnan',
   },
   TextInput: {
    width : 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius : 5,
    marginLeft : 'auto',
    marginRight : 'auto'
  },
   CorrectButton:{
    width : 300, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    borderRadius:5,

    backgroundColor : "#27BAFF"
   },
   Text:{
       color : "white",
       textAlign : "center",
       marginTop : 5,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 15,
       fontFamily: 'Jalnan',
   },
   Introduce:{
    color : "black",
    textAlign : "center",
    marginRight : 'auto',
    marginTop : 10,
    marginBottom : 70,
    paddingLeft : 10,
    paddingRight : 10,
    fontSize : 25,
    fontFamily: 'Jalnan',
}
  });

export default Certify;