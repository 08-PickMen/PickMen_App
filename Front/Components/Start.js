import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';


function Start() {
    return(
            <View>
                <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.Text}>시작하기</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection : 'row', marginTop : 10}}>
                    <Text style={{
                    marginLeft : 'auto',
                    paddingLeft : 10,
                    paddingRight : 10,
                    fontWeight : 'bold',
                    fontSize : 15,
                }}>이미 계정이 있으시다면?</Text>
                <Text style={{
                    paddingLeft : 10,
                    paddingRight : 10,
                    fontWeight : 'bold',
                    fontSize : 15,
                    color : '#27BAFF',
                    marginRight : 'auto'
                }}>로그인하기</Text>
                </View>  
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
    marginTop : 600,
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
   }
  });

export default Start;