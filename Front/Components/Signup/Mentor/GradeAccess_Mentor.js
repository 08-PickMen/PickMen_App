import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import 'react-navigation'

async function ImageSave(image) {
    await AsyncStorage.setItem('image', JSON.stringify(image));
}


async function ImageCheck() {
    await AsyncStorage.removeItem('image');
}

function GradeAccess({ navigation }) {
    var data = new FormData();
    const [nickName, setNickName] = useState('');
    const [image, setImage] = useState(null);
    const [profileImage, setprofileImage] = useState(null);
    const [CorrectText, setCorrectText] = useState('');
    const [Gradefile, setGradefile] = useState('');
    const [signCheck, setSignCheck] = useState(false);
    const [placeholder, setPlaceholder] = useState('내용을 입력해주세요.');
    const [checkText, setCheckText] = useState('');
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const DuplicateCheck = (nickName) => {      
        axios.get('http://10.0.2.2:8090/DuplicateCheck', {
            params: {
                nickname: nickName
            }
        }).then(response => {
            console.log(response.data.status)
            if(response.data.status == '200') {
                console.log('중복체크 성공')
                setCheckText('중복체크 성공')
            } else if(response.data.status == '500') {
                console.log('중복체크 실패')
                setCheckText('중복체크 실패')
            }
        })
        return 0;
    }
    const saveNickName = async (nickName) => {
        try {
            await AsyncStorage.setItem('nickName', nickName);
        } catch (e) {
            console.log(e);
        }
    }
    async function ImageUpload() {
        launchImageLibrary({}, async function (response) {
            if (response.assets[0].uri) {
                setImage(response.assets[0].uri);
                setGradefile(response.assets[0].fileName.substring(0, 30) + '...');
            }
            var data = new FormData();
            data.append('file', {
                uri: Platform.OS === 'android' ? response.assets[0].uri : 'file://' + response.assets[0].uri,
                name: 'image.jpg',
                type: 'image/jpeg'
            });
            axios.post('http://10.0.2.2:8090/certificate', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.status);
                if(response.request._response == '인증 실패'){
                    Alert.alert('실패', '성적 확인이 실패했습니다.');
                } else {
                    Alert.alert('성공', '성공적으로 성적이 인증 되었습니다.');
                    setSignCheck(true);
                }
            })
        })

    }
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
            console.log(data)
            console.log(data)
            ImageCheck();
            ImageSave(data);
        })

    }
    const renderCheckText = () => {
        const backgroundColor = checkText === '중복체크 실패' ? '#ff0000' : '#27baff';
        return (
            <View>
                <Text style = {{marginLeft : 20, fontFamily : 'Jalnan', fontSize : 17, color : backgroundColor}}>{checkText}</Text>
            </View>    
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style={styles.PageStyle}>
                <View style={styles.Introduce}>
                    <Text style={styles.Introduce}>개인정보 입력</Text>
                </View>
                <View>
                    <Text style={styles.Text}>닉네임</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.TextInput} placeholder = {placeholder} onChangeText={(nickName) => setNickName(nickName)} />
                    <TouchableOpacity style={styles.CheckButton} onPress={() => {
                        DuplicateCheck(nickName);}}>
                        <Text style={styles.ButtonText}>중복인증</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {renderCheckText()}
                </View>
                <View>
                    <Text style={styles.CorrectText}>{CorrectText}</Text>
                </View>
                <View>
                    <Text style={styles.Text}>성적표</Text>
                </View>
                <View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.TextInput} value={Gradefile} editable={false} maxLength={33} />
                    <TouchableOpacity style={styles.CheckButton}
                        onPress={() => {
                            ImageUpload(); {

                            }
                        }}>
                        <Text style={styles.ButtonText}>업로드</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.Text}>프로필 사진</Text>
                </View>
                <View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.TextInput} value={profileImage} editable={false} maxLength={33} />
                    <TouchableOpacity style={styles.CheckButton}
                        onPress={() => { ProfileUpload(); }}>
                        <Text style={styles.ButtonText}>업로드</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.CorrectButton}
                        onPress={() => {
                            if(signCheck){
                                saveNickName(nickName);
                                navigation.navigate('Information_Mentor')
                            } else {
                                Alert.alert('실패', '성적인증에 실패하셨습니다.');
                            }
                            }}>
                        <Text style={styles.ButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CorrectButton: {
        width: 280,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    AccessButton: {
        width: 220,
        height: 40,
        paddingTop: 5,
        marginLeft: 50,
        marginRight: 'auto',
        borderRadius: 5,
        backgroundColor: "#27BAFF"
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
    CorrectText: {
        color: "#27BAFF",
        fontSize: 15,
        fontFamily: 'Jalnan',
        marginLeft: 40,
    },
    FailText: {
        color: '#F00',
        fontSize: 15,
        fontFamily: 'Jalnan',
        marginLeft: 40,
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
    Introduce: {
        color: "black",
        textAlign: "center",
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 25,
    },
    PageStyle: {
        backgroundColor: 'white',
        width: 380,
        height: 720,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default GradeAccess;