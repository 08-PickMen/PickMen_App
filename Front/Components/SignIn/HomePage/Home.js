import React, { useEffect, useState } from 'react';
import { View, Text, Image, BackHandler, FlatList, StyleSheet, Dimensions } from 'react-native';
import 'react-navigation';
import megaphone from '../../../icons/megaphone.png';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import axios from 'axios';
import { Card } from 'react-native-paper';
import TeachIcon from '../../../icons/teach.png';
import MajorIcon from '../../../icons/Major.png';
import star from '../../../icons/star.png';
// 홈 화면
function Home({ navigation }) {
    const [sliderTime, setSliderTime] = useState(1);
    const bannerList = ['hello', 'hello2', 'hello3', 'hello4'];
    const [mentorList, setMentorList] = useState([]);
    useEffect(() => {
        const autoTimer = setTimeout(() => setSliderTime(6), 1000);
        axios.get('http://10.0.2.2:8090/mentorList').then(response => {
            var count = parseInt(response.data.length);
            console.log(response.data)
            var newData = [];
            for (var i of response.data) {
                newData.push({
                    id: i.id,
                    averageRating: i.averageRating,
                    nickname: i.nickname,
                    lectureDto1: i.lectureDto1,
                    lectureDto2: i.lectureDto2,
                    majorDto: i.majorDto
                },)
            }
            setMentorList(newData);
        })
        return () => clearTimeout(autoTimer);
    }, [])
    const Item = ({ item }) => {
        return (
            <View style={{ width: 400, justifyContent: 'center' }}>
                <Card style={{ marginLeft: 'auto', marginRight: 30, width: 350, height: 300, borderRadius: 10, borderWidth: .5, borderColor: '#a0a0a0' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: "http://10.0.2.2:8090/getProfile?userid=" + Number(item.id) }} style={styles.ProfileImage} />
                        <View>
                            <Text style={styles.nickname}>{item.nickname}</Text>
                            <View style = {{flexDirection : 'row'}}>
                                <Image source ={TeachIcon} style={styles.TeachIcon} />
                                <Text style = {styles.lectures}>{item.lectureDto1.name},{'\n'}{item.lectureDto2.name}</Text>
                            </View>
                            <View style = {{flexDirection : 'row'}}>
                                <Image source = {MajorIcon} style={styles.MajorIcon} />
                                <Text style = {styles.major}>{item.majorDto.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {{marginLeft : 20,marginTop : 40,flexDirection : 'row'}}>
                        <Image source = {star} style={styles.star} />
                        <Text style = {styles.averageRating}>{parseFloat(item.averageRating).toFixed(1)}  /  5</Text>
                    </View>
                </Card>
            </View>
        )
    }
    const renderItem = ({ item }) => {
        return (
            <Item item={item}
            />
        )
    }
    return (
            <View style = {styles.PageStyle}>
            <View>
                <SwiperFlatList
                    autoplay={true}
                    autoplayDelay={sliderTime}
                    data={mentorList}
                    autoplayLoop={true}
                    index={0}
                    renderItem={renderItem} />
            </View>
            <View style={{ }}>
                <Text>Test 화면</Text>
            </View>
            </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    ProfileImage: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginLeft: 20,
        marginTop: 20,
    },
    nickname: {
        fontSize: 20,
        fontFamily: 'NanumSquareRoundB',
        marginLeft: 20,
        marginTop: 20,
        color: 'black'
    },
    TeachIcon : {
        width: 17,
        height: 17, 
        marginTop : 10, 
        marginLeft : 20,
    },
    MajorIcon : {
        width: 20,
        height: 20, 
        marginTop : 20, 
        marginLeft : 20,
    },
    lectures : {
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        marginLeft: 20,
        color: 'black'
    },
    major : {
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        marginTop : 20,
        marginLeft: 20,
        color: 'black'
    },
    star : {
        width : 30,
        height : 30,
    },
    averageRating : {
        marginLeft : 20,
        marginTop : 5,
        fontFamily : 'NanumSquareRoundB',
        fontSize : 20,
        color : 'black',
    },
    PageStyle: {
        backgroundColor: 'black',
        width: 430,
        height: 684,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        flex : 1,
    },
})


export default Home;