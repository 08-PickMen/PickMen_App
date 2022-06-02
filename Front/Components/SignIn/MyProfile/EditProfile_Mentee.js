import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

function EditProfile_Mentee({ navigation }) {
    const [profileImage, setprofileImage] = useState(null);
    const [checkText, setCheckText] = useState('');
    const [nickName, setNickName] = useState('');
    const [lectureList, setLectureList] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [lecture, setLecture] = useState('');
    const [lecture2, setLecture2] = useState('');
    const ids = [Number(lecture), Number(lecture2)];
    const data = new FormData();

    useEffect(() => {
        axios.get('http://10.0.2.2:8090/getAllLectureList').then(response => {
            var newData = [];
            for (var i of response.data) {
                newData.push({
                    label: i.name,
                    value: i.id,
                });
            }
            setLectureList(newData);
        })
    }, [])

    async function ProfileUpload() {
        launchImageLibrary({}, response => {
            if (response.assets[0].uri) {
                console.log(response);
                setprofileImage(response.assets[0].fileName.substring(0, 30) + '...');
            }
            data.append('profile', {
                uri: response.assets[0].uri,
                name: 'image.jpg',
                type: 'image/jpeg',
            });
        })
    }
    const renderCheckText = () => {
        const backgroundColor = checkText === '중복체크 실패' ? '#ff0000' : '#27baff';
        return (
            <View>
                <Text style={{ marginLeft: 20, fontFamily: 'Jalnan', fontSize: 17, color: backgroundColor }}>{checkText}</Text>
            </View>
        )
    }
    const DuplicateCheck = (nickName) => {
        axios.get('http://10.0.2.2:8090/DuplicateCheck', {
            params: {
                nickname: nickName
            }
        }).then(response => {
            console.log(response.data.status)
            if (response.data.status == '500' || nickName == '') {
                console.log('중복체크 실패')
                setCheckText('중복체크 실패')
            } else if (response.data.status == '200') {
                console.log('중복체크 성공')
                setCheckText('중복체크 성공')
            }
        })
        return 0;
    }
    const userUpdate = () => {
        axios.post('http://10.0.2.2:8090/user/update', null, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                nickname: nickName,
                lectureList: ids.join(',')
            },
        }).then(response => {
            console.log(response.data)
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style={styles.PageStyle}>
                <View>
                    <Text style={styles.Text}>프로필 사진</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.TextInput} value={profileImage} editable={false} maxLength={33} />
                    <TouchableOpacity style={styles.CheckButton}
                        onPress={() => { ProfileUpload(); }}>
                        <Text style={styles.ButtonText}>업로드</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.Text}>닉네임</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.TextInput} onChangeText={(nickName) => setNickName(nickName)} />
                    <TouchableOpacity style={styles.CheckButton} onPress={() => {
                        DuplicateCheck(nickName);
                    }}>
                        <Text style={styles.ButtonText}>중복인증</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {renderCheckText()}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{}}>
                        <Text style={styles.Sector}>관심 강의 1</Text>
                        <View>
                            <DropDownPicker
                                style={{ width: 160, marginRight: 'auto', borderColor: '#a0a0a0' }}
                                open={open}
                                value={value}
                                searchable={true}
                                zIndex={2000}
                                zIndexInverse={2000}
                                dropDownContainerStyle={{ borderColor: '#a0a0a0', height: 170 }}
                                searchContainerStyle={{ borderColor: '#a0a0a0', borderBottomWidth: .15 }}
                                listItemContainerStyle={{ borderColor: '#a0a0a0', borderTopWidth: 0 }}
                                searchTextInputStyle={{ height: 30, borderRadius: 0, borderWidth: 0, borderColor: '#a0a0a0' }}
                                items={lectureList}
                                placeholder="관심 강의를 선택하세요."
                                placeholderStyle={{ borderColor: '#a0a0a0', fontFamily: 'NanumSquareRoundB', fontSize: 14 }}
                                searchPlaceholder='강의 검색'
                                containerStyle={{ width: 160, marginLeft: 10, marginRight: 'auto' }}
                                onChangeValue={(itemValue) => {
                                    const getIndex = (itemValue) => {
                                        for (var i = 0; i < lectureList.length; i++) {
                                            if (lectureList[i].value == itemValue) {
                                                return i;
                                            }
                                        }
                                    }
                                    if (getIndex(itemValue) >= 0) {
                                        setLecture(lectureList[getIndex(itemValue)].value);
                                    }
                                }}

                                setValue={setValue}
                                setOpen={setOpen}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.Sector}>관심 강의 2</Text>
                        <View>
                            <DropDownPicker
                                style={{ width: 160, marginRight: 'auto', borderColor: '#a0a0a0' }}
                                open={open2}
                                value={value2}
                                searchable={true}
                                zIndex={1000}
                                zIndexInverse={3000}
                                dropDownContainerStyle={{ borderColor: '#a0a0a0', height: 170 }}
                                searchContainerStyle={{ borderColor: '#a0a0a0', borderBottomWidth: .15 }}
                                listItemContainerStyle={{ borderColor: '#a0a0a0', borderTopWidth: 0 }}
                                searchTextInputStyle={{ height: 30, borderRadius: 0, borderWidth: 0, borderColor: '#a0a0a0' }}
                                items={lectureList}
                                placeholder="관심 강의를 선택하세요."
                                placeholderStyle={{ borderColor: '#a0a0a0', fontFamily: 'NanumSquareRoundB', fontSize: 14 }}
                                searchPlaceholder='강의 검색'
                                containerStyle={{ width: 160, marginLeft: 30, marginRight: 'auto' }}
                                onChangeValue={(itemValue) => {
                                    const getIndex = (itemValue) => {
                                        for (var i = 0; i < lectureList.length; i++) {
                                            if (lectureList[i].value == itemValue) {
                                                return i;
                                            }
                                        }
                                    }
                                    if (getIndex(itemValue) >= 0) {
                                        setLecture2(lectureList[getIndex(itemValue)].value);
                                    }
                                }}
                                setValue={setValue2}
                                setOpen={setOpen2}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            userUpdate();
                            navigation.dispatch(CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'MyProfile' }]
                            }))
                        }}
                        style={styles.CorrectButton}>
                        <Text style={styles.ButtonText}>적용</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    PageStyle: {
        backgroundColor: 'white',
        width: 400,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    Sector: {
        fontFamily: 'Jalnan',
        fontSize: 15,
        color: 'black',
        marginLeft: 35,
        marginBottom: 15,
    },
    CheckButton: {
        width: 100,
        height: 40,
        paddingTop: 5,
        marginRight: 20,
        marginTop: 12,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    ButtonText: {
        color: "white",
        textAlign: "center",
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    TextInput: {
        width: 240,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 20
    },
    Text: {
        marginTop: 35,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'SCDream1',
        marginLeft: 15,
        marginRight: 100
    },
    ButtonText: {
        color: "white",
        textAlign: "center",
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    CorrectButton: {
        width: 280,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 220,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
})

export default EditProfile_Mentee;