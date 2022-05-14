import React from 'react';
import { View, Text, StyleSheet ,FlatList, TouchableOpacity, Alert} from 'react-native';
import {Card, Title, Paragraph, Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import 'react-navigation';

function MentoProfile() {
    function createChatRoom() {

        firestore().collection('THREADS').get().then(snp => {
        var  count = snp.docs.length;
        
        firestore()
       .collection('THREADS')
       .add({
           id : count,
           name : ''+'와의 Chat Room',
       })
    })
}
    
    const renderCard = ({ item }) => {
        return (
            <Card style = {styles.cards}>
            <Card.Title title = "멘토 정보" subtitle = "Mento Profile" titleStyle = {styles.MainTitle} subtitleStyle={styles.subtitle}/>
            <Card.Content>
                <View style = {{flexDirection : 'row'}}>
                    <Title style = {styles.MentoName}>멘토 닉네임</Title>
                    <Title style = {styles.MentoGrade}>학점</Title>
                </View>
                <Paragraph></Paragraph>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity style = {{marginLeft : 10}} onPress={()=>{createChatRoom()}}>
                    <Text style = {styles.ButtonText}>채팅 연결하기</Text>
                </TouchableOpacity>
            </Card.Actions>
            </Card>
        )
      };
    

    return(
            <View style={{flex : 1, backgroundColor : '#fff'}}>
                <View>
                    <Text style = {styles.Title}>
                        멘토 프로필 리스트
                    </Text>
                </View>
                <View style = {{borderBottomColor : 'black', borderBottomWidth : .5, marginBottom : 20,}}/>
                <FlatList
                    data = {[1,2,3,4]}
                    renderItem={renderCard}
                >
                </FlatList>
            </View>
    )
}

const styles = StyleSheet.create({
    cards : {
        borderRadius : 10,
        width : 400,
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
    MentoGrade : {
        fontFamily: 'Jalnan',
        marginBottom : 10,
        fontSize : 14,
        marginLeft : 60,
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

export default MentoProfile;