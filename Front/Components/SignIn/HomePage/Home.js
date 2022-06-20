import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { LogBox } from 'react-native';
import 'react-navigation';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-paper';
import TeachIcon from '../../../icons/teach.png';
import MajorIcon from '../../../icons/Major.png';
import star from '../../../icons/star.png';
// 홈 화면
const Home = ({ navigation }) =>{
    const [sliderTime, setSliderTime] = useState(1);
    const [mentorList, setMentorList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [role, setRole] = useState('');
    useEffect(() => {
        const autoTimer = setTimeout(() => setSliderTime(3), 1000);
        axios.get('http://10.0.2.2:8090/mentorList').then(response => {
            var newData = [];
            for (var i of response.data) {
                newData.push({
                    id: i.id,
                    averageRating: i.averageRating,
                    nickname: i.nickname,
                    lectureDto1: i.lectureDto1,
                    lectureDto2: i.lectureDto2,
                    majorDto: i.majorDto
                })
            }
            setMentorList(newData);
        })
        axios.get('http://10.0.2.2:8090/post/getAll').then(response => {
            var newData = [];
            for (var i of response.data.content) {
                newData.push({
                    id: i.id,
                    title: i.title,
                    user: i.user,
                    content: i.content,
                    count: i.count,
                    nickname: i.nickname,
                })
            }
            setPostList(newData);
        })
        axios.get('http://10.0.2.2:8090/user/get/profile').then(response => {
            setRole(response.data.data.role);
        })
        return () => clearTimeout(autoTimer);
    }, [])
    useEffect(() => {
        return () => {
            console.log('unmount');
        }
    }, [])
    LogBox.ignoreAllLogs(true);
    const renderRole = (role) => {
        const backgroundColor = role === 'MENTOR' ? '#ff0000' : '#27BAFF';
        if (role == 'MENTOR') {
          return (
            <Text style={{
              fontSize: 15,
              fontFamily: 'NanumSquareRoundB',
              marginTop: 32,
              marginBottom: 10,
              marginLeft: 10,
              color: backgroundColor
            }}>[멘티 구함]</Text>
          )
    
        } else if (role == 'MENTEE') {
          return (
            <Text style={{
              fontSize: 15,
              fontFamily: 'NanumSquareRoundB',
              marginTop: 32,
              marginBottom: 10,
              marginLeft: 10,
              color: backgroundColor
            }}>[멘토 구함]</Text>
          )
        }
      }
    const Item = ({ item }) => {
        return (
            <View style={{ width: 400, marginTop: 30, flexWrap: 'wrap' }}>
                <Card style={{
                    marginLeft: 4, width: 390, height: 230, borderRadius: 10, borderWidth: 1,
                    borderColor: '#a0a0a0', flexWrap: 'wrap'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FastImage source={{ uri: "http://10.0.2.2:8090/getProfile?userid=" + Number(item.id), cache : FastImage.cacheControl.web}} style={styles.ProfileImage} />
                        <View>
                            <Text style={styles.nickname}>{item.nickname}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={TeachIcon} style={styles.TeachIcon} />
                                <Text
                                    ellipsizeMode='middle'
                                    style={styles.lectures}>{item.lectureDto1.name},{'\n'}{item.lectureDto2.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={MajorIcon} style={styles.MajorIcon} />
                                <Text style={styles.major}>{item.majorDto.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.RatingText}>종합 평점</Text>
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 5, flexDirection: 'row' }}>
                        <Image source={star} style={styles.star} />
                        <Text style={styles.averageRating}>{parseFloat(item.averageRating).toFixed(1)}  /  5</Text>
                    </View>
                </Card>
            </View>
        )
    }
    const PostItem = ({ item }) => {
        return (
            <View style={{ width: 400, marginTop: 30, }}>
                <Card style={{
                    marginLeft: 4, width: 390, height: 230, borderRadius: 10, borderWidth: 1,
                    borderColor: '#a0a0a0',
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FastImage source={{ uri: "http://10.0.2.2:8090/getProfile?userid=" + Number(item.user.id), cache : FastImage.cacheControl.web}} style={styles.ProfileImage} />
                        <Text style={styles.nickname}>{item.nickname}</Text>
                        <Text style={styles.countText}>조회 수 {item.count}</Text>
                    </View>
                    <View style = {{flexDirection : 'row'}}>
                        {renderRole(item.user.role)}
                        <Text style={styles.titleText}>{item.title}</Text>
                    </View>
                    <View style = {{flexDirection : 'row'}}>
                        <Text style={styles.contentText}>{item.content}</Text>
                    </View>
                </Card>
            </View>
        )
    }
    const renderPost = ({ item }) => {
        return (
            <PostItem item={item} />
        )
    }
    const renderTitle = (role) => {
            return(
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.frontTitle}>추천</Text>
                    <Text style={styles.Title}>프로필 리스트</Text>
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
        <View style={{ flex: 1, backgroundColor: '#27BAFF' }}>
            <View style={styles.PageStyle}>
                {renderTitle(role)}
                <View style={{ flex: 1 }}>
                    <SwiperFlatList
                        autoplay={true}
                        autoplayDelay={sliderTime}
                        data={mentorList}
                        autoplayLoop={true}
                        index={0}
                        renderItem={renderItem} />
                </View>
                <View>
                    <Text style = {styles.PostTitle}>최근 올라온 게시물</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <SwiperFlatList
                        autoplay={true}
                        autoplayDelay={sliderTime}
                        data={postList}
                        autoplayLoop={true}
                        index={0}
                        renderItem={renderPost} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    frontTitle: {
        marginLeft: 20,
        marginTop: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 18,
        color: '#27BAFF'
    },
    Title: {
        marginLeft: 5,
        marginTop: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 18,
        color: 'black'
    },
    PostTitle: {
        marginLeft: 20,
        marginTop: -10,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 18,
        color: 'black'
    },
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
    TeachIcon: {
        width: 17,
        height: 17,
        marginTop: 10,
        marginLeft: 20,
    },
    MajorIcon: {
        width: 20,
        height: 20,
        marginTop: 20,
        marginLeft: 20,
    },
    lectures: {
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        marginLeft: 20,
        color: 'black',
    },
    major: {
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        marginTop: 20,
        marginLeft: 20,
        color: 'black'
    },
    star: {
        width: 30,
        height: 30,
    },
    averageRating: {
        marginLeft: 20,
        marginTop: 5,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 20,
        color: 'black',
    },
    RatingText: {
        marginLeft: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 30,
        color: 'black',
    },
    titleText: {
        marginLeft: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 30,
        color: 'black',
    },
    contentText: {
        marginLeft: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 15,
        marginTop: 30,
        color: '#a0a0a0',
    },
    countText : {
        marginLeft: 'auto',
        marginRight : 20,
        marginTop : 40,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 15,
        color : 'black',
    },
    PageStyle: {
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
})


export default Home;