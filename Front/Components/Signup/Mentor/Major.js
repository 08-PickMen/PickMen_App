import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import 'react-navigation';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

function Major({navigation}){
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [department, setDepartment] = useState('');
    const [departmentValue, setDepartmentValue] = useState('');
    const [lecture1, setLecture1] = useState('');
    const [lecture2, setLecture2] = useState('');
    const [majorList, setMajorList] = useState([]);
    const [majorList2, setMajorList2] = useState([]);
    const [lectureList, setLectureList] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);

    const items = [
        { label: '소프트웨어학과', value: 1 },
        { label: '전자공학과', value: 2 },
    ]
    const majoritems = [
        { label: '컴퓨터구조', value: 1 },
        { label: '소프트웨어공학', value: 2 },
        { label: 'SW캡스톤디자인', value: 3 },
        { label: '예술이란 무엇인가?', value: 4 },
        { label: '인공지능', value: 5 },
        { label: '알고리즘', value: 6 },
    ]
    function bubblesort(list = [], key = 'value') {
        var temp;
        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < list.length - i - 1; j++) {
                if (list[j][key] > list[j + 1][key]) {
                    temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
    }
    async function saveMajor() {
        try {
            await AsyncStorage.setItem('Lecture1', String(lecture1));
            await AsyncStorage.setItem('Lecture2', String(lecture2));
            await AsyncStorage.setItem('LectureText1', String(selectedValue));
            await AsyncStorage.setItem('LectureText2', String(selectedValue2));
            await AsyncStorage.setItem('department', String(department));
            await AsyncStorage.setItem('departmentValue', String(departmentValue));
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        axios.get('http://10.0.2.2:8090/getAllMajorList').then(response => {
            var count = response.data.length;
            var list = [];
            for(var i = 0; i < count; i++){
                list.push({
                    label: response.data[i].name,
                    value: response.data[i].id
                })
            }
            setMajorList(list);       
        })

        axios.get('http://10.0.2.2:8090/getAllLectureList').then(response => {
            var count = response.data.length;
            var list = [];
            for(var i = 0; i < count; i++){
                list.push({
                    label: response.data[i].name,
                    value: response.data[i].id
                })
            }
            setLectureList(list);
        })
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    },[])
    return(
        <View style = {{backgroundColor : '#fff', flex  :1,}}>
            <Text style = {styles.MainTitle}>전공 분야 선택</Text>
            <View style ={{marginTop : 50,}}>
                <Text style = {styles.Sector}>전공 선택</Text>
            </View>
            <View>
            <DropDownPicker
                style = {{width : 350, marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0'}}
                open={open}
                value={value}
                zIndex={3000}
                zIndexInverse={1000}
                searchable={true}
                dropDownContainerStyle={{borderColor : '#a0a0a0'}}
                searchContainerStyle={{borderColor : '#a0a0a0', borderBottomWidth : .15}}
                listItemContainerStyle={{borderColor : '#a0a0a0', borderTopWidth : 0}}
                searchTextInputStyle={{height : 30, borderRadius : 0, borderWidth : 0, borderColor : '#a0a0a0'}}
                items={majorList}
                placeholder="전공 학과를 선택하세요."
                placeholderStyle={{borderColor : '#a0a0a0', fontFamily : 'NanumSquareRoundB', fontSize : 14}}
                searchPlaceholder = '학과 검색'
                containerStyle={{width : 350, marginLeft : 'auto', marginRight : 'auto'}}
                onChangeValue={(itemValue) => {
                    const getIndex = (itemValue) => {
                        for (var i=0; i<majorList.length; i++) {
                            if (majorList[i].value == itemValue) {
                                return i;
                            }
                        }
                    }
                    if(getIndex(itemValue)>=0) {
                        setDepartment(majorList[getIndex(itemValue)].label);
                        setDepartmentValue(majorList[getIndex(itemValue)].value);
                    }
                }}

                setValue={setValue}
                setOpen={setOpen}
            />
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto', borderRadius : 10}}>
            </View>
            <View style={{marginTop : 50,}}>
                <Text style = {styles.Sector}>전공 분야 1</Text>
            </View>
            <View>
            <DropDownPicker
                style = {{width : 350, marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0'}}
                open={open2}
                value={value2}
                searchable={true}
                zIndex={2000}
                zIndexInverse={2000}
                dropDownContainerStyle={{borderColor : '#a0a0a0'}}
                searchContainerStyle={{borderColor : '#a0a0a0', borderBottomWidth : .15}}
                listItemContainerStyle={{borderColor : '#a0a0a0', borderTopWidth : 0}}
                searchTextInputStyle={{height : 30, borderRadius : 0, borderWidth : 0, borderColor : '#a0a0a0'}}
                items={lectureList}
                placeholder="전문 강의 분야를 선택하세요."
                placeholderStyle={{borderColor : '#a0a0a0', fontFamily : 'NanumSquareRoundB', fontSize : 14}}
                searchPlaceholder = '강의 검색'
                containerStyle={{width : 350, marginLeft : 'auto', marginRight : 'auto'}}
                onChangeValue={(itemValue) => {
                    const getIndex = (itemValue) => {
                        for (var i=0; i<lectureList.length; i++) {
                            if (lectureList[i].value == itemValue) {
                                return i;
                            }
                        }
                    }
                    if(getIndex(itemValue)>=0) {
                        setSelectedValue(lectureList[getIndex(itemValue)].label);
                        setLecture1(itemValue);
                    }
                }}
                setValue={setValue2}
                setOpen={setOpen2}
            />
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto',  borderRadius : 10}}>
            </View>
            <View style ={{marginTop : 50,}}>
                <Text style = {styles.Sector}>전공 분야 2</Text>
            </View>
            <View>
            <DropDownPicker
                style = {{width : 350, marginLeft : 'auto', marginRight : 'auto', borderColor : '#a0a0a0'}}
                open={open3}
                value={value3}
                searchable={true}
                zIndex={1000}
                zIndexInverse={3000}
                dropDownContainerStyle={{borderColor : '#a0a0a0'}}
                searchContainerStyle={{borderColor : '#a0a0a0', borderBottomWidth : .15}}
                listItemContainerStyle={{borderColor : '#a0a0a0', borderTopWidth : 0}}
                searchTextInputStyle={{height : 30, borderRadius : 0, borderWidth : 0, borderColor : '#a0a0a0'}}
                items={lectureList}
                placeholder="전문 강의 분야를 선택하세요."
                placeholderStyle={{borderColor : '#a0a0a0', fontFamily : 'NanumSquareRoundB', fontSize : 14}}
                searchPlaceholder = '강의 검색'
                containerStyle={{width : 350, marginLeft : 'auto', marginRight : 'auto'}}
                onChangeValue={(itemValue) => {
                    const getIndex = (itemValue) => {
                        for (var i=0; i<lectureList.length; i++) {
                            if (lectureList[i].value == itemValue) {
                                return i;
                            }
                        }
                    }
                    if(getIndex(itemValue)>=0){
                        setSelectedValue2(lectureList[getIndex(itemValue)].label);
                        setLecture2(itemValue);
                    }
                    
                }}
                setValue={setValue3}
                setOpen={setOpen3}
            />
            </View>
            <View style ={{width : 350,marginLeft : 'auto', marginRight : 'auto',  borderRadius : 10}}>
            </View>
            
            <View>
                <TouchableOpacity style = {styles.Button}
                    onPress = {()=>{                          
                            saveMajor();
                            navigation.navigate('Introduce_Mentor');
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