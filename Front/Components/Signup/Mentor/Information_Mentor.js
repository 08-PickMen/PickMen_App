import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import 'react-navigation'

const Information_Mento = ({ navigation }) => {
    var [value, setValue] = useState('');
    var [Password, setPassword] = useState('');
    var [correctPassword, setCorrectPassword] = useState('');
    var [sendEmail, setSendEmail] = useState('');
    var [sendPassword, setSendPassword] = useState('');
    var [userName, setUserName] = useState('');
    const [checkIdText, setCheckIdText] = useState('');
    const [checkPasswordText, setCheckPasswordText] = useState('');

    const returnEmail = async () => {
        var data = await AsyncStorage.getItem('email');
        setValue(data)
        setSendEmail(data)
    }
    const checkId = (username) => {
        axios.get('http://10.0.2.2:8090/DuplicateCheckId', {
            params: {
                username: username,
            }
        }).then(response => {
            if(response.data.status == '200') {
                setCheckIdText('사용 가능한 아이디입니다.')
            } else {
                setCheckIdText('중복된 아이디입니다.')
            }
        })
    }
    const checkPassword = (password, correctPassword) => {
        if(password == correctPassword) {
            setCheckPasswordText('비밀번호가 일치합니다.')
        } else {
            setCheckPasswordText('비밀번호가 일치하지 않습니다.')
        }
    }
    const renderCheckPassword = () => {
        const backgroundColor = checkPasswordText == '비밀번호가 일치하지 않습니다.' ? '#ff0000' : '#27BAFF';
        return (
            <View>
                <Text style={{ marginLeft : 30, marginTop : 10, fontFamily : 'Jalnan', fontSize : 15, color: backgroundColor }}>{checkPasswordText}</Text>
            </View>
        )
    }
    const renderCheckId = () => {
        const backgroundColor = checkIdText == '중복된 아이디입니다.' ? '#ff0000' : '#27BAFF';
        return (
            <View>
                <Text style={{ marginLeft : 30, marginTop : 10, fontFamily : 'Jalnan', fontSize : 15, color: backgroundColor }}>{checkIdText}</Text>
            </View>
        )
    }
    const savePassword = async (password) => {
        await AsyncStorage.setItem('password', String(password));
        var data = await AsyncStorage.getItem('password');

        setSendPassword(data)
    }
    const register = async (username, email, password) => {
        var nickname = await AsyncStorage.getItem('nickName');
        var data2 = await AsyncStorage.getItem('image');
        var changeImage = JSON.parse(data2)._parts
        var lecture1 = await AsyncStorage.getItem('Lecture1');
        var lecture2 = await AsyncStorage.getItem('Lecture2');
        var departmentValue = await AsyncStorage.getItem('departmentValue');
        var schoolValue = await AsyncStorage.getItem('school');
        var lectureList = [Number(lecture1), Number(lecture2)]
        var introduceMyself = await AsyncStorage.getItem('introduceMyself');
        var livingWhere = await AsyncStorage.getItem('liveinWhere');
        var mentoringContents = await AsyncStorage.getItem('mentoringContents');

        var InputImage = new FormData();
        var time = Date.now();
        InputImage.append('profile', {
            uri: changeImage[0][1].uri,
            name: "image" + time + ".jpg",
            type: 'image/jpeg',
        })
        await axios.post('http://10.0.2.2:8090/signup/mentor', InputImage, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: {
                username: username,
                password: password,
                nickname: nickname,
                email: email,
                major: Number(departmentValue),
                school: Number(schoolValue),
                lectureList: lectureList.join(','),
                introduceMyself: introduceMyself,
                livingWhere: livingWhere,
                mentoringContents: mentoringContents,
            }
        }
        ).then((response) => {
            console.log(response.data)
            AsyncStorage.removeItem('image');
        })
    }
    returnEmail();
    return (
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style={styles.PageStyle}>
                <View style={styles.Introduce}>
                    <Text style={styles.Introduce}>개인정보 입력</Text>
                </View>
                <View>
                    <Text style={styles.Text}>ID</Text>
                    <TextInput style={styles.TextInput} placeholder="내용을 입력해주세요." onChangeText={(username) => { setUserName(username) }} />
                    <View style = {{flexDirection : 'row'}}>
                        {renderCheckId()}
                        <TouchableOpacity onPress = {()=> checkId(userName)}style = {{marginLeft : 'auto', marginRight : 30, backgroundColor : '#27BAFF', borderRadius : 10, width : 80, height : 40,}}>
                            <Text style={{ color: '#fff', marginTop: 'auto',marginLeft : 'auto',marginRight : 'auto',marginBottom : 'auto',fontFamily : 'Jalnan'}} onPress={() => { checkId(userName) }}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.Text}>이메일 주소</Text>
                    <TextInput style={styles.TextInput} placeholder={String(value)} editable={false} selectTextOnFocus={false}
                        backgroundColor='gray' placeholderTextColor='white' />
                </View>
                <View>
                    <Text style={styles.Text}>비밀번호 입력</Text>
                    <TextInput style={styles.TextInput} placeholder="내용을 입력해주세요." onChangeText={Password => setPassword(Password)} />
                </View>
                <View>
                    <Text style={styles.Text}>비밀번호 재입력</Text>
                    <TextInput style={styles.TextInput} placeholder="내용을 입력해주세요." onChangeText={CorrectPassword => {
                        setCorrectPassword(CorrectPassword)
                    }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View>{renderCheckPassword()}</View>
                    <TouchableOpacity style={styles.CorrectButton}
                        onPress={() => {
                            checkPassword(Password, correctPassword)
                            savePassword(Password);
                        }}>
                        <Text style={styles.ButtonText}>비밀번호 확인</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.Button}
                        onPress={() => {
                            if (checkIdText == '사용 가능한 아이디입니다.' && checkPasswordText == '비밀번호가 일치합니다.') {
                                register(userName, sendEmail, sendPassword);
                                navigation.navigate('RegisterComplete');
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
    Button: {
        width: 280,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 110,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    CorrectButton: {
        width: 110,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 20,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    CorrectText: {
        color: "red",
        fontSize: 15,
        fontFamily: 'Jalnan',
        marginTop: 10,
        marginLeft: 50
    },
    backupText: {
        color: "#27BAFF",
        fontSize: 15,
        fontFamily: 'Jalnan',
        marginTop: 10,
        marginLeft: 50
    },
    FailText: {
        color: "#27BAFF",
        fontSize: 15,
        fontFamily: 'Jalnan',
        marginTop: 10,
        marginLeft: 20
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
        width: 320,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    RRNumberText: {
        width: 320,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    RRText: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'SCDream1',
    },
    Text: {
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'SCDream1',
        marginLeft: 50,
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

export default Information_Mento;