import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import PickerBox from 'react-native-picker-select';
import 'react-navigation';


function Major({navigation}){
    const [selectdValue, setSelectdValue] = React.useState('관심 분야를 선택하세요');
    return(
        <View>
            <Text style = {styles.MainTitle}>전공 분야 선택</Text>
            <View style = {{borderBottomColor : '#a0a0a0', borderBottomWidth : 1, marginTop : 20,}}/>
            <View style={{marginTop : 50,}}>
                <Text style = {styles.Sector}>전공 분야 1</Text>
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0', borderWidth : 1, borderRadius : 10}}>
            <PickerBox 
                    selectdValue={selectdValue}
                    onValueChange={(itemValue, itemIndex) => setSelectdValue(itemValue)}
                    items={[
                        { label: 'Test용', value: '테스트용' },
                    ]}
                    >
            </PickerBox>
            </View>
            <View style ={{marginTop : 140,}}>
                <Text style = {styles.Sector}>전공 분야 2</Text>
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0', borderWidth : 1, borderRadius : 10}}>
            <PickerBox 
                    selectdValue={selectdValue}
                    onValueChange={(itemValue, itemIndex) => setSelectdValue(itemValue)}
                    items={[
                        { label: 'Test용', value: '테스트용' },
                    ]}
                    >
            </PickerBox>
            </View>
            <View>
                <TouchableOpacity style = {styles.Button}
                    onPress = {()=>{navigation.navigate('Certify_Mento')}}>
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