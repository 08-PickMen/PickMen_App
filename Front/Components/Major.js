import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import PickerBox from 'react-native-picker-select';
import 'react-navigation';



function Major({navigation}){
    const [selectedValue, setSelectedValue] = useState('전공분야를 선택하세요.');
    const [selectedValue2, setSelectedValue2] = useState('전공분야를 선택하세요.');
    const [major, setMajor] = useState('');
    const [major2, setMajor2] = useState('');

    async function saveMajor() {
        try {
            await AsyncStorage.setItem('major1', String(major));
            await AsyncStorage.setItem('major2', String(major2));
            await AsyncStorage.setItem('majorText1', String(selectedValue));
            await AsyncStorage.setItem('majorText2', String(selectedValue2));
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <View>
            <Text style = {styles.MainTitle}>전공 분야 선택</Text>
            <View style={{marginTop : 50,}}>
                <Text style = {styles.Sector}>전공 분야 1</Text>
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0', borderWidth : 1, borderRadius : 10}}>
            <PickerBox 
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); setMajor(itemIndex)}}
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
                <Text style = {styles.Sector}>전공 분야 2</Text>
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0', borderWidth : 1, borderRadius : 10}}>
            <PickerBox 
                    selectedValue={selectedValue2}
                    onValueChange={(itemValue, itemIndex) => {setSelectedValue2(itemValue); setMajor2(itemIndex)}}
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
                        if(selectedValue== selectedValue2) {
                            Alert.alert('전공 분야는 다르게 선택해주세요.');
                        }
                        else {
                            console.log(major,major2);
                            saveMajor();
                            navigation.navigate('Certify_Mento');
                        }
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
 

export default Major;