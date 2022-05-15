import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Title} from 'react-native-paper';
import myprofile from './MyProfile';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


function Profile() {
    return(
        <View style ={{backgroundColor : '#fff'}}>
        <Card style = {styles.cards}>
            <Card.Title>
                <Title>프로필</Title>
            </Card.Title>
            <Image source={{uri : 'http://10.0.2.2:8090/getProfile?userid='+myprofile[0].id}} style = {{marginLeft : 'auto', marginRight : 'auto' ,width : 150, height : 150, borderRadius : 100}}/>
            <TouchableOpacity>
            <Text style={{marginTop : 20, marginLeft :'auto', marginRight : 'auto', fontSize : 16, color : '#27BAFF'}}>Change Profile photo</Text>
            </TouchableOpacity>
            <Card.Content>
                <View style = {{marginTop : 60}}>
                    <Text>Nickname</Text>
                </View>
                <View>
                    <Title style={{fontSize : 18}}>{myprofile[0].nickname}</Title>
                </View>
                <View style={{marginTop : 5, borderBottomColor : '#a0a0a0', borderBottomWidth : 1}}/>
                <View style = {{marginTop : 20}}>
                    <Text>Email</Text>
                </View>
                <View>
                    <Title style={{fontSize : 18}}>{myprofile[0].email}</Title>
                </View>
                <View style={{marginTop : 5, borderBottomColor : '#a0a0a0', borderBottomWidth : 1}}/>
                <View style = {{marginTop : 20}}>
                    <Text>University</Text>
                </View>
                <View>
                    <Title style={{fontSize : 18}}>{'아주대학교'}</Title>
                </View>
                <View style={{marginTop : 5, borderBottomColor : '#a0a0a0', borderBottomWidth : 1}}/>
                <View style = {{marginTop : 20}}>
                    <Text>TeachSector</Text>
                </View>  
                <View>
                    <Title style={{fontSize : 18}}>{myprofile[0].teachSector}</Title>
                </View>
                <View style={{marginTop : 5, borderBottomColor : '#a0a0a0', borderBottomWidth : 1}}/>
                <TouchableOpacity style = {{marginTop : 30}}>
                    <Text style={{fontSize : 16, color : '#27BAFF'}}>Personal Information Settings</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    cards : {
        borderRadius : 10,
        width : 400,
        height : '99%',
        borderWidth : 1,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 10,
    },
    MainTitle : {
        fontSize : 17,
        fontFamily: 'Jalnan',
        color : "#27BAFF",
    },
    subtitle : {  
        fontFamily: 'Jalnan',
        color : "black"
    },
    MentoName : {
        fontFamily: 'Jalnan',
        marginBottom : 10,
        fontSize : 14,
    },
    nickName : {
        fontFamily: 'Jalnan',
        marginBottom : 10,
        fontSize : 14,
        color : '#a0a0a0'
    },
    MentoGrade : {
        fontFamily: 'Jalnan',
        marginBottom : 10,
        fontSize : 14,
        marginLeft : 30,
    },
    Title : {
        fontFamily: 'Jalnan',
        fontSize : 17,
        color : "#27BAFF",
        marginBottom : 10,
        marginLeft : 10,
        marginTop : 18,
    },
    ButtonText : {
        fontFamily: 'Jalnan',
        fontSize : 14,
        color : "#27BAFF",
    }
})


export default Profile;