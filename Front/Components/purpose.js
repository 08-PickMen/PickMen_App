import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';

function Purpose() {
    return(
            <View style = {{}}>
                <View style = {{marginBottom : 100}}>
                    <Text style = {styles.Introduce}>당신의 가입 목적은 무엇인가요?</Text>
                </View>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.Text}>멘토</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.Text}>멘티</Text>
                </TouchableOpacity>
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
   Text:{
       color : "white",
       textAlign : "center",
       marginTop : 5,
       paddingLeft : 10,
       paddingRight : 10,
       fontWeight : 'bold',
       fontSize : 15,
   },
   Introduce:{
    color : "black",
    textAlign : "center",
    marginTop : 200,
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight : 'bold',
    fontSize : 20,
}
  });

export default Purpose;