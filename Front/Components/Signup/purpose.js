import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import 'react-navigation'
const Purpose = ({navigation}) => {
    return(
            <Card style = {{flex : 1,backgroundColor : '#27BAFF'}}>
                <View style = {{backgroundColor : 'white',width : 380, height : 720,borderColor : 'white', borderWidth : 1, borderRadius : 30,marginLeft : 'auto', marginRight : 'auto', marginTop : 'auto', marginBottom : 'auto'}}>
                    <View style = {{marginBottom : 100}}>
                        <Text style = {styles.Introduce}>당신의 가입 유형은 무엇인가요?</Text>
                    </View>
                    <TouchableOpacity style={styles.Button}
                        onPress = {()=> navigation.navigate('SelectSchool_Mentor')}>
                        <Text style={styles.Text}>멘토</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button}
                        onPress = {() => navigation.navigate('SelectSchool_Mentee')}>
                        <Text style={styles.Text}>멘티</Text>
                    </TouchableOpacity>
                </View>
            </Card>
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
    borderRadius:20,

    backgroundColor : "#27BAFF"
   },
   Text:{
       color : "white",
       textAlign : "center",
       marginTop : 5,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 15,
       fontFamily : 'Jalnan',
   },
   Introduce:{
    color : "black",
    textAlign : "center",
    marginTop : 200,
    paddingLeft : 10,
    paddingRight : 10,
    fontSize : 20,
    fontFamily : 'Jalnan',
}
  });

export default Purpose;