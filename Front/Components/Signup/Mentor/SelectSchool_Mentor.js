import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';
import PickerBox from 'react-native-picker-select';
import 'react-navigation'
import Schools from '../../localData/SchoolLabel'
import AsyncStorage from '@react-native-community/async-storage';
function SelectSchool_Mentor({navigation}) {
    const [selectdValue, setSelectdValue] = React.useState('학교를 선택하세요');
    const [schoolValue, setSchoolValue] = React.useState('');
    async function saveSchool() {
        try {
            await AsyncStorage.setItem('school', String(selectdValue));
            await AsyncStorage.setItem('schoolValue', String(schoolValue));
        } catch (e) {
        }
    }
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
                              overflow : 'hidden',}}>
                <PickerBox 
                    selectdValue={selectdValue}
                    onValueChange={(itemValue, itemIndex) => {setSelectdValue(Schools[itemIndex-1].label); setSchoolValue(itemIndex)}}
                    items = {Schools}
                    >
                    </PickerBox>
                    </View>
                     <TouchableOpacity style={styles.startButton}
                       onPress = {() => {saveSchool(); navigation.navigate('Major')}}>
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
       fontSize : 15,
       fontFamily : 'Jalnan',
   },
   Introduce:{
    color : "black",
    textAlign : "center",
    marginRight : 'auto',
    marginTop : 10,
    marginBottom : 40,
    paddingLeft : 10,
    paddingRight : 10,
    fontSize : 20,
    fontFamily : 'Jalnan',
}
  });

export default SelectSchool_Mentor;