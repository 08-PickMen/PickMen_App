import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Modal } from 'react-native-paper';
import myprofile from '../../localData/MyProfile';
import axios from 'axios';

function EditProfile_Mentor({ navigation }) {
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
    const [modalVisible, setModalVisible] = useState(false);
    const [mentoringContents, setMentoringContents] = useState('');
    const [mentorIntroduce, setMentorIntroduce] = useState('');
    const isFocused = useIsFocused();
    var data = new FormData();

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
    }, [isFocused])
    async function saveImage() {
        try {
            await AsyncStorage.setItem('profileImage', JSON.stringify(data));
        } catch (e) {
        }
    }
    function ProfileUpload() {
        launchImageLibrary({}, response => {
            if (response.assets[0].uri) {
                setprofileImage(response.assets[0].fileName.substring(0, 30) + '...');
            }
            data.append('profile', {
                uri: response.assets[0].uri,
                name: 'image.jpg',
                type: 'image/jpeg',
            });
            saveImage();
            
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
    const userUpdate = async () => {
        var newdata = await AsyncStorage.getItem('profileImage');
        const ids = [Number(lecture), Number(lecture2)];
        var profileImage = new FormData();
        profileImage.append('profile', {
            uri: String(JSON.parse(newdata)._parts[0][1].uri, "utf-8"),
            name: String(JSON.parse(newdata)._parts[0][1].name, "utf-8"),
            type: String(JSON.parse(newdata)._parts[0][1].type, "utf-8"),
        })
        console.log(profileImage)
        console.log(nickName, ids, mentorIntroduce, mentoringContents)
        axios.put('http://10.0.2.2:8090/mentor/update', profileImage, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                nickname: nickName,
                lectureList: ids.join(','),
                mentoringContents: mentoringContents,
                introduceMyself: mentorIntroduce,
            },
        }).then(response => {
            myprofile.length = 0;
            myprofile.push({
                averageRating: response.data.averageRating,
                email: response.data.email,
                id: response.data.id,
                userLectures: response.data.userLectures,
                nickname: response.data.nickname,
                introduceMyself: response.data.introduceMyself,
                livingWhere: response.data.livingWhere,
                role: response.data.role,
                mentoringContents: response.data.mentoringContents,
            })
        }).catch(error => {
            console.log(error)
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
                        <Text style={styles.Sector}>전문 강의 1</Text>
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
                                placeholder="전문 강의를 선택하세요."
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
                        <Text style={styles.Sector}>전문 강의 2</Text>
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
                                placeholder="전문 강의를 선택하세요."
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
                    <Text style={styles.DetailText}>상세 정보 설정</Text>
                    <TouchableOpacity style={styles.DetailButton} onPress={() => { setModalVisible(true) }}>
                        <Text style={styles.ButtonText}>설정</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            userUpdate();
                            Alert.alert(
                                '정보가 수정되었습니다.',
                                '',
                                [
                                    {
                                        text: '확인',
                                        onPress: () => {
                                            navigation.dispatch(CommonActions.reset({
                                                index: 0,
                                                routes: [{ name: 'EditProfile_Mentee' }, { name: 'MyProfile' },]
                                            }))
                                        },

                                    }
                                ]
                            )
                        }}
                        style={styles.CorrectButton}>
                        <Text style={styles.ButtonText}>적용</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={modalVisible}>
                <View style={styles.ModalStyle}>
                    <View>
                        <Text style={styles.IntroduceText}>멘토 자기소개</Text>
                        <TextInput style={styles.IntroduceTextInput}
                            multiline={true}
                            onChangeText={(text) => setMentorIntroduce(text)}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.MentoringText}>멘토링 내용</Text>
                        <TextInput style={styles.MentoringTextInput}
                            multiline={true}
                            onChangeText={(text) => setMentoringContents(text)}
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={styles.ModalButton} onPress={() => { setModalVisible(false) }}>
                        <Text style={styles.ButtonText}>설정 완료</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    IntroduceTextInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a0a0a0',
        width: 330,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlignVertical: 'top',
        marginBottom: 30,
    },
    IntroduceText: {
        marginTop: 35,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        color : 'black',
        marginLeft: 15,
        marginRight: 'auto',
        marginBottom : 20,
    },
    MentoringTextInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a0a0a0',
        width: 330,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlignVertical: 'top',
        marginBottom: 30,
    },
    MentoringText: {
        marginTop: 35,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        color : 'black',
        marginLeft: 15,
        marginRight: 'auto',
        marginBottom : 20,
    },
    ModalStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        width: 370,
        height: 600,
        marginBottom: 'auto'
    },
    ModalButton: {
        width: 200,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginTop: 100,
        marginRight: 'auto',
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    DetailButton: {
        width: 200,
        height: 40,
        paddingTop: 5,
        marginLeft: 20,
        marginTop: 20,
        marginRight: 'auto',
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    DetailText: {
        marginLeft: 20,
        marginTop: 50,
        marginRight: 'auto',
        color: "black",
        fontFamily: 'Jalnan',
        fontSize: 15,
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
        marginTop: 120,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
})

export default EditProfile_Mentor;