import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-navigation';
import axios from 'axios';
import { Card, Title } from 'react-native-paper';
import myprofile from '../../localData/MyProfile';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

// 접속한 유저의 프로필 정보를 불러오는 페이지
const MyProfile = ({navigation}) => {
    const [lecturelist, setLecturelist] = useState([]);
    const [lecturelist2, setLecturelist2] = useState([]);
    const [major, setMajor] = useState('');
    const [school, setSchool] = useState('');
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const isFocused = useIsFocused();
    // 접속한 유저의 관심 분야를 불러오는 함수
    useEffect(() => {
        axios.get('http://10.0.2.2:8090/lecture/getAll').then((response) => {
            setLecturelist(response.data[0]);
            setLecturelist2(response.data[1]);
            console.log(response.data[0], response.data[1]);
        })
        axios.get('http://10.0.2.2:8090/user/detailInfo').then((response) => {  
            setMajor(response.data.data.majorName);
            setSchool(response.data.data.schoolName);
        })
        setId(myprofile[0]?.id);
        setNickname(myprofile[0]?.nickname);
        setEmail(myprofile[0]?.email);
        setRole(myprofile[0]?.role);
    }, [isFocused])
    const renderRole = (role) => {
        if(role == 'MENTEE'){
            return (
                <Text>관심 강의</Text>
            )
        } else {
            return(
                <Text>전문 강의</Text>
            )
        }
    }
    return (
        <View style={{ backgroundColor: '#27BAFF', flex: 1 }}>
            <Card style={styles.cards}>
                <Card.Title>
                    <Title>프로필</Title>
                </Card.Title>
                <FastImage source={{uri :'http://10.0.2.2:8090/getProfile?userid=' + Number(id),
                cache : FastImage.cacheControl.web
                }} style={{ marginLeft: 'auto', marginRight: 'auto', width: 150, height: 150, borderRadius: 100 }} />
                <Card.Content>
                    <View style={{ marginTop: 20 }}>
                        <Text>닉네임</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{nickname}</Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>이메일</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{email}</Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>소속 대학</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{school}</Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        <Text>학과</Text>
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{major} </Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <View style={{ marginTop: 20 }}>
                        {renderRole(role)}
                    </View>
                    <View>
                        <Title style={{ fontSize: 18 }}>{lecturelist.name}, {lecturelist2.name} </Title>
                    </View>
                    <View style={{ marginTop: 5, borderBottomColor: '#a0a0a0', borderBottomWidth: 1 }} />
                    <TouchableOpacity style={{ marginTop: 10 }} onPress = {()=>{
                        if(role == 'MENTEE'){
                            navigation.navigate("EditProfile_Mentee")
                        } else {
                            navigation.navigate("EditProfile_Mentor")
                        }
                        }}>
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
        width: 400,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
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


export default MyProfile;