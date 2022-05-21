import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import PickerBox from 'react-native-picker-select';
import 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

function Attention({navigation}){
    const [selectdValue, setSelectdValue] = React.useState('관심 분야를 선택하세요');
    const [selectdValue2, setSelectdValue2] = React.useState('관심 분야를 선택하세요');
    const [lecture1, setLecture1] = React.useState('');
    const [lecture2, setLecture2] = React.useState('');

    async function saveLecture() {
        try {
            await AsyncStorage.setItem('lecture1', String(lecture1));
            await AsyncStorage.setItem('lecture2', String(lecture2));
        } catch (e) {
            console.log(e);
        }
    }
    return(
        <View>
            <Text style = {styles.MainTitle}>관심 강의 선택</Text>
            <View style={{marginTop : 50,}}>
                <Text style = {styles.Sector}>관심 강의 1</Text>
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0', borderWidth : 1, borderRadius : 10}}>
            <PickerBox 
                    selectdValue={selectdValue}
                    onValueChange={(itemValue, itemIndex) => {setSelectdValue(itemValue); setLecture1(itemIndex)}}
                    items={[
                        { label: '컴퓨터구조', value: 1 },
                        { label: '소프트웨어공학', value: 2 },
                        { label: 'SW캡스톤디자인', value: 3 },
                        { label: '예술이란 무엇인가?', value: 4 },
                        { label: '인공지능', value: 5 },
                        { label: '알고리즘', value: 6 },
                    ]}
                    >
            </PickerBox>
            </View>
            <View style ={{marginTop : 140,}}>
                <Text style = {styles.Sector}>관심 강의 2</Text>
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0', borderWidth : 1, borderRadius : 10}}>
            <PickerBox 
                    selectdValue={selectdValue2}
                    onValueChange={(itemValue, itemIndex) => {setSelectdValue2(itemValue); setLecture2(itemIndex)}}
                    items={[
                        { label: '컴퓨터구조', value: 1 },
                        { label: '소프트웨어공학', value: 2 },
                        { label: 'SW캡스톤디자인', value: 3 },
                        { label: '예술이란 무엇인가?', value: 4 },
                        { label: '인공지능', value: 5 },
                        { label: '알고리즘', value: 6 },
                    ]}
                    >
            </PickerBox>
            </View>
            <View>
                <TouchableOpacity style = {styles.Button}
                    onPress = {()=>{
                        if(selectdValue == selectdValue2){
                            Alert.alert('중복된 분야 선택');
                        }
                        else {
                            saveLecture();
                            navigation.navigate('Certify')}
                        }}>
                    <Text style = {styles.Text}>
                        확인
                    </Text>
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
     marginTop : 200,
     borderRadius:5,
 
     backgroundColor : "#27BAFF"
    },
    MainTitle : {
        fontSize : 20,
        fontFamily : 'Jalnan',
        marginTop : 20,
        marginLeft : 20,
        color : 'black',
    },
    Sector : {
        fontFamily : 'Jalnan',
        fontSize : 15,
        color : 'black',
        marginLeft : 35,
        marginBottom : 15,
    },
    Text:{
        color : "white",
        textAlign : "center",
        marginTop : 5,
        paddingLeft : 10,
        paddingRight : 10,
        fontSize : 15,
        fontFamily : 'Jalnan',
    }
   });
 

export default Attention;