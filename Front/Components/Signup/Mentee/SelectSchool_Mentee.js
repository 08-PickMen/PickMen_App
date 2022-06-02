import React , {useEffect, useState}from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';
import PickerBox from 'react-native-picker-select';
import 'react-navigation'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';

function SelectSchool_Mentee({navigation}) {
    const [selectedValue, setSelectedValue] = useState('학교를 선택하세요');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [schoolList, setSchoolList] = useState([]);

    async function saveSchool() {
        try {
            await AsyncStorage.setItem('school', String(selectedValue));
        } catch (e) {
        }
    }
    useEffect(() => {
        axios.get('http://10.0.2.2:8090/getAllSchoolList').then(response => {
            var count = response.data.length;
            var newData = [];
            for (var i = 1; i < count; i++) {
                newData.push({
                    label: response.data[i].name,
                    value: response.data[i].id,
                });
            }
            setSchoolList(newData);
        })
    })
    return(
            <View style = {{flex : 1, backgroundColor : '#27BAFF'}}>
                <View style = {styles.PageStyle}>
                <View>
                    <Text style = {styles.Introduce}>학교 선택</Text>
                </View>
                <View>
                    <DropDownPicker
                        style={{ width: 300, marginLeft: 'auto', marginRight: 'auto', borderColor: '#a0a0a0' }}
                        open={open}
                        value={value}
                        zIndex={3000}
                        zIndexInverse={1000}
                        searchable={true}
                        dropDownContainerStyle={{ borderColor: '#a0a0a0' }}
                        searchContainerStyle={{ borderColor: '#a0a0a0', borderBottomWidth: .15 }}
                        listItemContainerStyle={{ borderColor: '#a0a0a0', borderTopWidth: 0 }}
                        searchTextInputStyle={{ height: 30, borderRadius: 0, borderWidth: 0, borderColor: '#a0a0a0' }}
                        items={schoolList}
                        placeholder="학교를 선택하세요."
                        placeholderStyle={{ borderColor: '#a0a0a0', fontFamily: 'NanumSquareRoundB', fontSize: 14 }}
                        searchPlaceholder='학교 검색'
                        containerStyle={{ width: 300, marginLeft: 'auto', marginRight: 'auto' }}
                        onChangeValue={(itemValue) => {
                            const getIndex = (itemValue) => {
                                for (var i = 0; i < schoolList.length; i++) {
                                    if (schoolList[i].value == itemValue) {
                                        return i;
                                    }
                                }
                            }
                            if (getIndex(itemValue) >= 0) {
                                setSchoolValue(schoolList[getIndex(itemValue)].value);
                            }
                        }}
                        setValue={setValue}
                        setOpen={setOpen}
                    />
                </View>
                     <TouchableOpacity style={styles.startButton}
                       onPress = {() => {saveSchool(); navigation.navigate('Attention')}}>
                    <Text style={styles.Text}>다음</Text>
                </TouchableOpacity>
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
    },
    PageStyle:{
        backgroundColor : 'white',
        width : 380, 
        height : 720,
        borderColor : 'white', 
        borderWidth : 1, 
        borderRadius : 30,
        marginLeft : 'auto', 
        marginRight : 'auto', 
        marginTop : 'auto', 
        marginBottom : 'auto'
      },
  });

export default SelectSchool_Mentee;