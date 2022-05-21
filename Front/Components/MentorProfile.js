import React from 'react';
import { View, Text, StyleSheet ,FlatList, TouchableOpacity, Alert, Image} from 'react-native';
import {Card, Title, Paragraph, Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import profiledata from './ProfileData';
import { CommonActions } from '@react-navigation/native';
import CreateRoom from './CreateRoom';

async function Test() {
    try{
    await axios.get('http://10.0.2.2:8090/mentors').then(async function(response){
        var data = response.data;
        console.log(data.length)
        for(var i=0;i<data.length;i++) {
            await AsyncStorage.setItem('data'+i, JSON.stringify(data[i]));
        }      
    })
    }catch(error) {
        console.log(error);
    }
}
async function loadData() {
    await axios.get('http://10.0.2.2:8090/mentors').then(async function(response){
        var data = response.data;
        var maxcount = data.length;
        profiledata.length = 0;
        for(var i=0;i<maxcount;i++) {
            var data2 = await AsyncStorage.getItem('data'+i);
            var newData = JSON.parse(data2);
            profiledata.push(newData);
        } }
    )
}

function MentorProfile({navigation}) {
    function createChatRoom(item) {
        Alert.alert(
            '채팅방이 생성되었습니다. 이동하시겠습니까?',
            '',
            [
                {
                    text: '확인',
                    onPress: () => { CreateRoom();},
                },
                {
                    text: '취소',
                    onPress: () => {navigation.dispatch(CommonActions.reset({
                        index : 0,
                        routes : [{name : 'MentoProfile'}]
                    }))},
                }
            ]
        )
        }
        const renderCard = ({ item }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('MentorProfileDetailPage', {item_id: item.id})}>
                <Card style = {styles.cards}>
                    <Card.Content style = {{flexDirection : 'row'}}>
                    </Card.Content>
                <Card.Content> 
                    <View>
                    <Image source = {{uri :'http://10.0.2.2:8090/getProfile?userid='+ Number(item.id)}}style = {{marginLeft : 'auto',marginRight : 'auto',width : 80, height : 80, borderRadius : 120}}></Image>
                    <View style={{flexDirection : 'column'}}>
                        <Text style={styles.MainTitle}>멘토</Text>
                        <Text style ={styles.nickName}>{item.nickname}</Text>              
                    </View>
                    <View>
                        <Text style = {styles.teachSector}>멘토 분야 :</Text>
                        <Text style = {styles.teachSector}></Text>
                        <Text style = {styles.MentoGrade}>학점 : </Text>
                    </View>
                    </View>
                </Card.Content>
                <Card.Actions>
                </Card.Actions>
                </Card>
                </TouchableOpacity>
            )
        };
        Test();
        loadData();
        return(
                <View style={{flex : 2, backgroundColor : '#fff'}}>
                    <View>
                        <Text style = {styles.Title}>
                            멘토 프로필 리스트
                        </Text>
                    </View>
                    <View style = {{borderBottomColor : 'black', borderBottomWidth : .5, marginBottom : 10,}}/>
                    <FlatList          
                        data = {profiledata}
                        renderItem={renderCard}
                        keyExtractor={item => item.id}
                        numColumns = {2}
                    >
                    </FlatList>
                </View>
        )
    }

const styles = StyleSheet.create({
    cards : {
        width : 194,
        height : 250,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    MainTitle : {
        fontSize : 17,
        fontFamily: 'Jalnan',
        color : '#27BAFF',
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop : 20,
    },
    subtitle : {  
        fontFamily: 'Jalnan',
        color : "black",
    },
    MentoName : {
        fontFamily: 'Jalnan',
        marginBottom : 10,
        fontSize : 14,
    },
    teachSector : {
        fontFamily: 'Jalnan',
        marginTop : 10,
        marginRight : 'auto',
        fontSize : 14,
        color :'black'
    },
    nickName : {
        fontFamily: 'Jalnan',
        marginLeft : 'auto',
        marginRight : 'auto',
        fontSize : 14,
        color :'black'
    },
    MentoGrade : {
        fontFamily: 'Jalnan',
        fontSize : 14,
        marginRight : 'auto',
        color :'black'
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

export default MentorProfile;