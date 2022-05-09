import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';

function GradeAccess() {
    return(
            <View>
                <View style = {styles.Introduce}>
                    <Text style = {styles.Introduce}>개인정보 입력</Text>
                </View>
                <View>
                    <Text style = {styles.Text}>닉네임</Text>
                </View>
                <View style = {{flexDirection : 'row', marginBottom : 100}}>
                <TextInput style = {styles.TextInput} placeholder = "내용을 입력해주세요."/>
                <TouchableOpacity style={styles.CheckButton}>
                        <Text style={styles.ButtonText}>중복인증</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <Text style = {styles.Text}>성적표</Text>
                </View>
                <View style = {{flexDirection : 'row'}}>
                <TextInput style = {styles.TextInput} placeholder = "성적표를 업로드 해주세요."/>
                <TouchableOpacity style={styles.CheckButton}>
                        <Text style={styles.ButtonText}>업로드</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.AccessButton}>
                        <Text style={styles.ButtonText}>인증하기</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.CorrectButton}>
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

export default GradeAccess;