import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import 'react-navigation'
import axios from 'axios';


async function ImageSave(image) {
    await AsyncStorage.setItem('image', JSON.stringify(image));
}

async function ImageLoad() {
    var data = await AsyncStorage.getItem('image');
    console.log(data);
}
function GradeAccess_Menti({ navigation, route}) {

    var data = new FormData();
    const [nickname, setNickname] = useState('');
    const [image, setImage] = useState(null);
    const [profileImage, setprofileImage] = useState('');
    const [textImage, setTextImage] = useState('');
    const [CorrectText, setCorrectText] = useState('');
    const [LocationCheck, setLocationCheck] = useState('위치를 설정해주세요.');
    const [checkNickname, setCheckNickname] = useState('');

    function DuplicateCheck(nickName) {
        axios.get('http://10.0.2.2:8090/DuplicateCheck', {
            params: {
                nickname: nickName
            }
        }).
            then(response => {
                if (response.data.status == '200') {
                    setCheckNickname('중복되는 닉네임이 없습니다.')
                } else {
                    setCheckNickname('중복되는 닉네임입니다.')
                }
            }).catch(error => {
                console.log(error)
            })
    }
    const saveNickName = async (nickName) => {
        try {
            await AsyncStorage.setItem('nickName', nickName);
        } catch (e) {
            console.log(e);
        }
    }
    const renderCheckNickname = () => {
        const backgroundColor = checkNickname == '중복되는 닉네임입니다.' ? '#ff0000' : '#27BAFF';
        return (
            <View>
                <Text style = {{marginTop : 10, marginLeft : 40, fontFamily : 'Jalnan', fontSize : 15, color : backgroundColor}}>{checkNickname}</Text>
            </View>
        )
    }
    function renderCheck(){
        const backgroundColor = LocationCheck === '위치를 설정해주세요.' ? '#ff0000' : '#27BAFF';
        return(
            <View>
                <Text style = {{marginTop : 10, marginLeft : 40, fontFamily : 'Jalnan', fontSize : 15, color : backgroundColor}}>{LocationCheck}</Text>
            </View>
        )
    }
    async function ImageUpload() {
        launchImageLibrary({}, response => {
            if (response.assets[0].uri) {
                console.log(response);
                setImage(response.assets[0].uri);
                setprofileImage(response.assets[0].fileName.substring(0, 30) + '...');
            }
            data.append('profile', {
                uri: response.assets[0].uri,
                name: 'image.jpg',
                type: 'image/jpeg',
            });
            console.log(data)
            console.log(data)
            ImageSave(data);
            ImageLoad();
        })

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
                <View style={{ flexDirection: 'row', }}>
                    <TextInput style={styles.TextInput} placeholder="내용을 입력해주세요." onChangeText={(NickName) => setNickname(NickName)} />
                    <TouchableOpacity style={styles.CheckButton}
                        onPress={
                            () => DuplicateCheck(nickname)
                        }>
                        <Text style={styles.ButtonText}>중복인증</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {renderCheckNickname()}
                </View>
                <View>
                    <Text style={styles.CorrectText}>{CorrectText}</Text>
                </View>
                <View>
                    <Text style={styles.Text}>프로필 사진</Text>
                </View>
                <View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.TextInput} value={profileImage} editable={false} maxLength={33} />
                    <TouchableOpacity style={styles.CheckButton}
                        onPress={() => { ImageUpload(); }}>
                        <Text style={styles.ButtonText}>업로드</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.Text}>위치 설정</Text>
                    <View style = {{flexDirection : 'row', marginBottom : 20,}}>{renderCheck()}
                    <TouchableOpacity style = {styles.MapButton} onPress={()=>{navigation.navigate("Map_mentee"); {
                        if(!route.params?.item_isSetLocation){
                            setLocationCheck('설정 완료');
                        }
                    }}}>
                        <Text style = {styles.ButtonText}>위치 찾기</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.CorrectButton}
                        onPress={() => {saveNickName(nickname);navigation.navigate('Information_Mentee')}}>
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
        marginTop: 220,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    CorrectText: {
        color: "#27BAFF",
        fontSize: 15,
        fontFamily: 'Jalnan',
        marginLeft: 50,
        marginBottom: 40,
    },
    AccessButton: {
        width: 320,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    MapButton: {
        width: 100,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 20,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    CheckButton: {
        width: 100,
        height: 40,
        paddingTop: 5,
        marginRight: 30,
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
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 20
    },
    Text: {
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'SCDream1',
        marginLeft: 25,
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

export default GradeAccess_Menti;