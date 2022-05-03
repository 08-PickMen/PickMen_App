import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';

function Information() {
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
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요."/>
                </View>
                <View>
                    <Text style = {styles.Text}>비밀번호 입력</Text>
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요."/>
                </View>
                <View>
                    <Text style = {styles.Text}>비밀번호 재입력</Text>
                    <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요."/>
                </View>
                <View>
                    <TouchableOpacity style={styles.Button}>
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