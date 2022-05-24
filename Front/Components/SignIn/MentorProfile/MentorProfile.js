import React, { useEffect } from 'react';
import { View, Text, StyleSheet ,FlatList, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-paper';
import 'react-navigation';
import axios from 'axios';

// 멘토 프로필 리스트 페이지
function MentorProfile({navigation}) {
    const [MentorList, setMentorList] = React.useState([]);
        // 간략한 멘토 프로필을 렌더링하는 함수
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
                        <Text style = {styles.MentoGrade}>학점 : {item.averageRating}</Text>
                    </View>
                    </View>
                </Card.Content>
                <Card.Actions>
                </Card.Actions>
                </Card>
                </TouchableOpacity>
            )
        };
        // 멘토 프로필 리스트를 불러오는 함수
        useEffect(() => {
            axios.get('http://10.0.2.2:8090/mentorList').then(async function(response){
                var data = response.data;
                setMentorList(data);
        })
        },[])
        return(
                <View style={{flex : 2, backgroundColor : '#fff'}}>
                    <View>
                        <Text style = {styles.Title}>
                            멘토 프로필 리스트
                        </Text>
                    </View>
                    <View style = {{borderBottomColor : 'black', borderBottomWidth : .5, marginBottom : 10,}}/>
                    <FlatList          
                        data = {MentorList}
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