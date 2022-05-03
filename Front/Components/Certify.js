import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import 'react-navigation'
function Certify({navigation}) {
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