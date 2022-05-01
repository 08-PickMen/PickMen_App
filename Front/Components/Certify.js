import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import * as Font from 'expo-font';

const getFonts = async () => {
  await Font.loadAsync({
      SCDream1: require('../assets/fonts/SCDream1.otf'),
  })
}

function Certify() {
    return(
            <View>
                <View style = {styles.Introduce}>
                    <Text style = {styles.Introduce}>인증하기</Text>
                </View>
                <TextInput style = {styles.TextInput} placeholder = "email을 입력해주세요"/>
                <TouchableOpacity style={styles.CertifyButton}>
                    <Text style={styles.Text}>인증번호 전송</Text>
                </TouchableOpacity>
                <TextInput style = {styles.TextInput} placeholder = "인증번호를 입력해주세요"/>
                <TouchableOpacity style={styles.CorrectButton}>
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
    marginBottom : 80
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
       fontWeight : 'bold',
       fontSize : 15,
       fontFamily: 'SCDream1'
   },
   Introduce:{
    color : "black",
    textAlign : "center",
    marginRight : 'auto',
    marginTop : 10,
    marginBottom : 70,
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight : 'bold',
    fontSize : 25,
}
  });

export default Certify;