import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';
import PickerBox from 'react-native-picker-select';

function SelectSchool() {
    return(
            <View>
                <View>
                    <Text style = {styles.Introduce}>학교 선택</Text>
                </View>
                <View style={{width : 300, 
                              height : 50, 
                              marginLeft : 'auto',
                              marginRight : 'auto',
                              marginTop : 30,
                              borderRadius : 10,
                              borderWidth : 1,
                              borderColor : '#bdc3c7', 
                              overflow : 'hidden'}}>
                <PickerBox 
                    placeholder = {{label : '학교를 선택하세요',value : null}} 
                    items = {[ 
                    {label : '아주대학교', value : 'AjouUniversity'},
                    {label : '서울대학교', value : 'SeoulUniversity'}]}
                    >
                    </PickerBox>
                    </View>
                     <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.Text}>다음</Text>
                </TouchableOpacity>
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
    marginTop : 20,
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
    marginRight : 'auto',
    marginTop : 10,
    marginBottom : 40,
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight : 'bold',
    fontSize : 20,
}
  });

export default SelectSchool;