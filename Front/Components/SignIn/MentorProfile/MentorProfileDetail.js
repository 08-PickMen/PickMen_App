import React, { useState , useEffect} from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, FlatList} from "react-native";
import {Card} from 'react-native-paper'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { CommonActions } from "@react-navigation/native";
import axios from 'axios';
import FastImage from "react-native-fast-image";
import TeachIcon from '../../../icons/teach.png';
import MajorIcon from '../../../icons/Major.png';
import EmailIcon from '../../../icons/email.png';
import star from '../../../icons/star.png';

// 상세 멘토 페이지를 불러오는 함수
const MentorProfileDetail = ({navigation, route}) => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const [Profile, setProfile] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [LectureList, setLectureList] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '소개'},
    {key: 'second', title: '멘토링 후기'},
  ])
  const bodyText = "This is not really a bird nest.";
  const mentor_id = route.params.item_id;
  const major_id = route.params.item_Major_id;
  const lecture1_id = route.params.item_lecture1_id;
  const lecture2_id = route.params.item_lecture2_id;
  const averageRating = route.params.item_averageRating;
  // 멘토 상세 정보를 불러오는 함수
  useEffect(() => {
      setLoading(false);
      axios.get('http://10.0.2.2:8090/user/mentor/'+Number(mentor_id)).then(response => {
        console.log(response.data)
        setProfile(response.data);
      }).catch(error => {
        console.log(error)
      })
      axios.get('http://10.0.2.2:8090/lecture/get/'+Number(mentor_id)).then(response => {
        setLectureList(response.data);
      })
      setLoading(true);
  },[])
  // 채팅방 생성 함수
  const createRoom = (mentor_id) => {
      axios.post('http://10.0.2.2:8090/chat/room/createRoom/'+Number(mentor_id)).then(response => {
        console.log(response.data)
      })
  }
  // 채팅방 생성 확인 함수
  const createChatRoom = (mentor_id) => {
    Alert.alert(
        '멘토와 채팅방을 생성하시겠습니까?',
        '',
        [
            {
                text: '확인',
                onPress: () => {createRoom(mentor_id);navigation.dispatch(CommonActions.reset({
                  index : 0,
                  routes : [{name : 'MentorProfilePage'}],
              }))},
            },
            {
                text: '취소',
                onPress: () => {navigation.dispatch(CommonActions.reset({
                    index : 0,
                    routes : [{name : 'MentorProfilePage'}]
                }))},
            }
        ]
    )
  }
  const FirstTab = () => {
    return (
      <ScrollView style = {{marginHorizontal : 20}}>
          <SafeAreaView style ={{flexDirection : 'row', height : 100,}}>
            <Text style ={styles.IntroduceMyself}>자기소개</Text>
            <Text style ={styles.IntroduceMyselfText}>{Profile.introduceMyself}</Text>
          </SafeAreaView>
          <SafeAreaView style ={{flexDirection : 'row',height : 80,}}>
            <Text style = {styles.LivingWhere}>거주지</Text>
            <Text style = {styles.LivingWhereText}>{Profile.livingWhere}</Text>
          </SafeAreaView>
          <SafeAreaView style ={{flexDirection : 'row', height : 100,}}>
            <Text style = {styles.Major}>멘토 분야</Text>
            <Text style = {styles.MajorText}>{LectureList[0]?.name}, {LectureList[1]?.name}</Text>
          </SafeAreaView>
          <SafeAreaView style ={{flexDirection : 'row'}}>
            <Text style = {styles.Teach}>멘토링 설명</Text>
            <Text style = {styles.TeachText}>{Profile.mentoringContents}</Text>
          </SafeAreaView>
          </ScrollView>
    )
  }

  
  const renderReview = (item) => {
    return (
      <View>
        <Card style = {{marginLeft: 'auto', marginRight : 'auto',marginTop : 20, width : 340,height : 100, borderWidth : 1}}>
          <Text style = {styles.reviewComment}>후기 : {item.content}</Text>
          <View>
            <Text style = {styles.Rating}>평점</Text>
            <View style = {{flexDirection : 'row'}}>
              <Image source={star} style={{width:20, height:20, marginLeft:20, marginTop : 10,}}/>
              <Text style = {styles.RatingText}>{parseFloat(item.rating).toFixed(1)} / 5</Text>
            </View>
          </View>
        </Card>
      </View>
    )
}
  const SecondTab = () => {
    console.log(Profile.reviews)
    if(Profile.reviews){
      return (
        <View style = {{flex : 1}}>
          <FlatList
            data={Profile.reviews}
            renderItem={({item}) => renderReview(item)}
            />
        </View>
      )
    } else {
      return (
        <Text>리뷰가 없습니다.</Text>
      )
    }
  }
  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
  });

  const renderTabBar = ({position,jumpTo, navigationState}) => {
    return (
      <TabBar
        position={position}
        jumpTo={jumpTo}
        style={styles.tabBarStyle}
        labelStyle={styles.labelStyle}
        indicatorStyle={{backgroundColor : '#27BAFF'}}
        navigationState={navigationState}
        inactiveColor = 'black'
        activeColor = '#27BAFF'
        />
    );
  }

  if(Loading==true)
    return (
      <SafeAreaView style = {{flex : 1, backgroundColor : '#27BAFF'}}>
        <Card style = {styles.CardStyle}>
          <SafeAreaView style = {{marginLeft : 15, marginTop : 20,flexDirection : 'row'}}>
            <FastImage source = {{uri : 'http://10.0.2.2:8090/getProfile?userid='+mentor_id, cache : FastImage.cacheControl.web}} style={{ marginLeft: 'auto', marginRight: 'auto', width: 60, height: 60, borderRadius: 120 }}/>
            <SafeAreaView>
              <SafeAreaView style = {{flexDirection : 'row'}}>
                <View style = {{marginRight : 70}}>
                <Text style = {styles.NickName}>{Profile.nickname}</Text>
                </View>
                <TouchableOpacity style = {styles.ChatButton} onPress = {()=>{createChatRoom(mentor_id)}}>
                  <Text style = {styles.ButtonText}>멘토 연결하기</Text>
                </TouchableOpacity>
              </SafeAreaView>
              <SafeAreaView style = {{}}>
                <Text style = {styles.Rating}>총 평점 : {averageRating}</Text>
              <SafeAreaView style = {{flexDirection : 'row'}}>
                <Image source={MajorIcon} style = {{marginTop : 15,marginLeft : 15, width : 18, height : 18,marginBottom : 15,}}/>
                <Text style = {{marginTop : 15, marginLeft : 15, fontFamily : 'NanumSquareRoundB', fontSize : 13}}>{major_id}</Text>
              </SafeAreaView>
              <SafeAreaView style = {{flexDirection : 'row'}}>
                <Image source={TeachIcon} style = {{marginLeft : 15, width : 18, height : 18,marginBottom : 15,}}/>
                <Text style = {{ marginLeft : 15, fontFamily : 'NanumSquareRoundB', fontSize : 13}}>{lecture1_id},{'\n'}{lecture2_id}</Text>
              </SafeAreaView>
              <SafeAreaView style = {{flexDirection : 'row'}}>
                <Image source={EmailIcon} style = {{marginTop : 10, marginLeft : 15, width : 18, height : 18}}/>
                <Text style = {styles.EmailAddress}>{Profile.email}</Text>
              </SafeAreaView>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
          <SafeAreaView style ={{marginTop : 30,borderBottomColor : '#a0a0a0', borderBottomWidth : .5}}/>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: 200}}
            renderTabBar={renderTabBar}
            />
        </Card>
      </SafeAreaView>
    );
  else {
    return(
    <View></View>
    )
  }
};

const styles = StyleSheet.create({
  CardStyle: {
      backgroundColor: 'white',
      width: 400,
      height: 680,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius : 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto'
},
reviewComment : {
  marginLeft : 15,
  marginTop : 10,
  fontFamily : 'NanumSquareRoundB',
  fontSize : 15,
  color : 'black',
},
Rating : {
  marginLeft : 15,
  marginTop : 10,
  fontFamily : 'NanumSquareRoundB',
  fontSize : 15,
  color : 'black',
},
RatingText : {
  marginLeft : 15,
  marginTop : 15,
  fontFamily : 'NanumSquareRoundB',
  fontSize : 15,
  color : 'black',
},
  NickName : {
    fontFamily : 'Jalnan',
    fontSize : 15,
    color : 'black',
    marginLeft : 30,
    marginTop : 5,
  },
  MajorStyle : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 20,
    marginTop : 15,
  },
  Lectures : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 20,
  },
  EmailAddress : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 20,
    marginTop : 10,
  },
  ChatButton : {
    width : 110,
    height : 45,
    backgroundColor : '#27BAFF',
    borderRadius : 3,
  },
  ButtonText : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : '#fff',
    marginLeft : 'auto',
    marginRight : 'auto',
    marginTop : 'auto',
    marginBottom : 'auto',
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  IntroduceMyself : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 20,
    marginTop : 20,
    marginRight : 20,
  },
  IntroduceMyselfText : {
    fontFamily : 'NanumSquareRound',
    fontSize : 15,
    color : 'black',
    marginTop : 20,
    marginLeft : 18,
    flex : 1,
    flexWrap : 'wrap',
  },
  LivingWhere : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 18,
    marginTop : 20,
    marginRight : 50,
  },
  LivingWhereText : {
    fontFamily : 'NanumSquareRound',
    fontSize : 15,
    color : 'black',
    marginTop : 20,
    flex : 1,
    flexWrap : 'wrap',
  },
  Major : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 18,
    marginTop : 20,
    marginRight : 35,
  },
  MajorText : {
    fontFamily : 'NanumSquareRound',
    fontSize : 15,
    color : 'black',
    marginTop : 20,
    flex : 1,
    flexWrap : 'wrap',
  },
  Teach : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 18,
    marginTop : 20,
    marginRight : 20,
  },
  TeachText : {
    fontFamily : 'NanumSquareRound',
    fontSize : 15,
    color : 'black',
    marginTop : 20,
    flex : 1,
    flexWrap : 'wrap',
  },
  tabBarStyle : {
    backgroundColor : '#fff',
    borderTopColor : '#a0a0a0',
  },
  labelStyle : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
  }

});

export default MentorProfileDetail;