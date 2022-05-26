import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-navigation'

async function saveMentorInformation(Introduce, livingWhere, mentoring) {
    await AsyncStorage.setItem('introduceMyself', Introduce);
    await AsyncStorage.setItem('livingWhere', livingWhere);
    await AsyncStorage.setItem('mentoringContents', mentoring);
}

function Introduce_Mentor({ navigation }) {
    const [Introduce, setIntroduce] = useState('');
    const [livingWhere, setLivingWhere] = useState('');
    const [mentoring, setMentoring] = useState('');

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
                    <TextInput style={{
                        borderWidth: 1, borderRadius: 5, borderColor: '#a0a0a0', width: 330, height: 60,
                        marginLeft: 'auto', marginRight: 'auto', textAlignVertical: 'top', marginBottom: 30,
                    }}
                        onChangeText={(text) => setLivingWhere(text)}
                    ></TextInput>
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
                    <TouchableOpacity style={styles.Button} onPress={() => { saveMentorInformation(Introduce, livingWhere, mentoring); navigation.navigate('Certify_Mentor') }}>
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