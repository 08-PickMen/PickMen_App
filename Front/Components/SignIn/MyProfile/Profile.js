import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import 'react-navigation';
import axios from 'axios';
import { Card, Title } from 'react-native-paper';
import myprofile from '../../localData/MyProfile';

// 접속한 유저의 프로필 정보를 불러오는 페이지
function Profile() {
    const [lecturelist, setLecturelist] = useState([]);
    const [lecturelist2, setLecturelist2] = useState([]);
    const [major, setMajor] = useState('');
    const [school, setSchool] = useState('');
    // 접속한 유저의 관심 분야를 불러오는 함수
    useEffect(() => {
        axios.get('http://10.0.2.2:8090/getLectureList').then(function (response) {
            setLecturelist(response.data[0]);
            setLecturelist2(response.data[1]);
        })
        axios.get('http://10.0.2.2:8090/user/detailInfo').then(function (response) {
            setMajor(response.data.data.majorName);
            setSchool(response.data.data.schoolName);
        })
    }, [])
    return (
        <View style={{ backgroundColor: '#27BAFF', flex : 1}}>
            <Card style={styles.cards}>
                <Card.Title>
                    <Title>프로필</Title>
                </Card.Title>
                <Image source={{ uri: 'http://10.0.2.2:8090/getProfile?userid=' + myprofile[0].id }} style={{ marginLeft: 'auto', marginRight: 'auto', width: 150, height: 150, borderRadius: 100 }} />
                <TouchableOpacity>
                    <Text style={{ marginTop: 20, marginLeft: 'auto', marginRight: 'auto', fontSize: 16, color: '#27BAFF' }}>Change Profile photo</Text>
                </TouchableOpacity>
                <Card.Content>
                    <View style={{ marginTop: 20 }}>
                        <Text>Nickname</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{myprofile[0].nickname}</Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>Email</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{myprofile[0].email}</Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>University</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{school}</Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>Major</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{major} </Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>Lecture</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{lecturelist.name}, {lecturelist2.name} </Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <TouchableOpacity style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: '#27BAFF' }}>Personal Information Settings</Text>
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    cards: {
        backgroundColor: 'white',
        width: 380,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    MainTitle: {
        fontSize: 17,
        fontFamily: 'Jalnan',
        color: "#27BAFF",
    },
    subtitle: {
        fontFamily: 'Jalnan',
        color: "black"
    },
    MentoName: {
        fontFamily: 'Jalnan',
        marginBottom: 10,
        fontSize: 14,
    },
    nickName: {
        fontFamily: 'Jalnan',
        marginBottom: 10,
        fontSize: 14,
        color: '#a0a0a0'
    },
    MentoGrade: {
        fontFamily: 'Jalnan',
        marginBottom: 10,
        fontSize: 14,
        marginLeft: 30,
    },
    Title: {
        fontFamily: 'Jalnan',
        fontSize: 17,
        color: "#27BAFF",
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 18,
    },
    ButtonText: {
        fontFamily: 'Jalnan',
        fontSize: 14,
        color: "#27BAFF",
    }
})


export default Profile;