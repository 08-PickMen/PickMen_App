import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-navigation'

const saveMentorInformation = async (Introduce, mentoring) => {
    await AsyncStorage.setItem('introduceMyself', Introduce);
    await AsyncStorage.setItem('mentoringContents', mentoring);
}

const Introduce_Mentor = ({ navigation , route }) => {
    const [Introduce, setIntroduce] = useState('');
    const [mentoring, setMentoring] = useState('');
    const [LocationCheck, setLocationCheck] = useState('위치를 설정해주세요.');

    const renderCheck = () => {
        const backgroundColor = LocationCheck === '위치를 설정해주세요.' ? '#ff0000' : '#27BAFF';
        return(
            <View>
                <Text style = {{marginTop : 10, marginLeft : 40, fontFamily : 'Jalnan', fontSize : 15, color : backgroundColor}}>{LocationCheck}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style={styles.PageStyle}>
                <View style={{ height: 60, marginBottom: 60, }}>
                    <Text style={styles.Introduce}>멘토 정보 입력</Text>
                </View>
                <View>
                    <Text style={styles.Text}>멘토 자기소개</Text>
                    <TextInput style={{
                        borderWidth: 1, borderRadius: 5, borderColor: '#a0a0a0', width: 330, height: 100,
                        marginLeft: 'auto', marginRight: 'auto', textAlignVertical: 'top', marginBottom: 30,
                    }}
                        multiline={true}
                        onChangeText={(text) => setIntroduce(text)}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.Text}>멘토 거주지</Text>
                    <View style = {{flexDirection : 'row', marginBottom : 20,}}>{renderCheck()}
                    <TouchableOpacity style = {styles.MapButton} onPress={()=>{navigation.navigate("Map"); {
                        if(!route.params?.item_isSetLocation){
                            setLocationCheck('설정 완료');
                        }
                    }}}>
                        <Text style = {styles.ButtonText}>위치 찾기</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.Text}>멘토링 내용</Text>
                    <TextInput style={{
                        borderWidth: 1, borderRadius: 5, borderColor: '#a0a0a0', width: 330, height: 120,
                        marginLeft: 'auto', marginRight: 'auto', textAlignVertical: 'top', marginBottom: 30,
                    }}
                        multiline={true}
                        onChangeText={(text) => setMentoring(text)}
                    ></TextInput>
                </View>
                <View>
                    <TouchableOpacity style={styles.Button} onPress={() => { saveMentorInformation(Introduce, mentoring); navigation.navigate('Certify_Mentor') }}>
                        <Text style={styles.ButtonText}>다음</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Introduce: {
        color: "#27BAFF",
        textAlign: "center",
        marginRight: 'auto',
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        fontFamily: 'Jalnan',
    },
    Text: {
        marginLeft: 40,
        fontFamily: 'Jalnan',
        fontSize: 15, color:
            'black',
        marginBottom: 10,
    },
    checkText : {
        marginTop : 20,
        fontFamily : 'Jalnan',

    },  
    Button: {
        width: 280,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
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
    ButtonText: {
        color: "white",
        textAlign: "center",
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',
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
})
export default Introduce_Mentor;