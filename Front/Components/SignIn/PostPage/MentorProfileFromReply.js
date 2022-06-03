import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { Card } from 'react-native-paper'
import { Avatar } from 'react-native-elements';
import { CommonActions } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import axios from 'axios';
import TeachIcon from '../../../icons/teach.png';
import MajorIcon from '../../../icons/Major.png';
import EmailIcon from '../../../icons/email.png';
import Mentor_id from '../../localData/Mentor_id'

// 댓글로부터 Mentor 상세 페이지를 불러오는 함수
const MentorProfileDetailFromReply = ({ navigation, route }) => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const [Profile, setProfile] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [LectureList, setLectureList] = useState([]);
  const bodyText = "This is not really a bird nest.";
  const mentor_id = route.params.item_id;
  const majorName = route.params.item_majorName;
  const lectureName1 = route.params.item_lectureName1;
  const lectureName2 = route.params.item_lectureName2;
  // 멘토 상세 페이지를 불러오는 함수
  useEffect(() => {
    setLoading(false);
    axios.get('http://10.0.2.2:8090/mentor/' + Number(mentor_id)).then(response => {
      setProfile(response.data);
    }).catch(error => {
      console.log(error)
    })
    axios.get('http://10.0.2.2:8090/getLectureListTest/' + Number(mentor_id)).then(response => {
      setLectureList(response.data);
    })
    setLoading(true);
  }, [])
  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };
  // 채팅방 생성 함수
  const createRoom = (mentor_id) => {
    axios.post('http://10.0.2.2:8090/chat/room/createRoom/' + mentor_id).then(response => {
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
          onPress: () => { createRoom(mentor_id); Mentor_id.push(mentor_id); navigation.dispatch(CommonActions.reset({
            index : 0,
            routes : [{name : 'PostPage'}],
        }))},
        },
        {
          text: '취소',
          onPress: () => {
            navigation.dispatch(CommonActions.reset({
              index: 0,
              routes: [{ name: 'PostPage' }]
            }))
          },
        }
      ]
    )
  }
  if (Loading == true)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Card style={styles.CardStyle}>
          <SafeAreaView style={{ marginLeft: 15, marginTop: 20, flexDirection: 'row' }}>
            <FastImage source={{ uri: 'http://10.0.2.2:8090/getProfile?userid=' + mentor_id , cache : FastImage.cacheControl.web}} style ={{ marginLeft: 'auto', marginRight: 'auto', width: 60, height: 60, borderRadius: 120 }} />
            <SafeAreaView>
              <SafeAreaView style={{ flexDirection: 'row' }}>
                <Text style={styles.NickName}>{Profile.nickname}</Text>
                <TouchableOpacity style={styles.ChatButton} onPress={() => { createChatRoom(mentor_id) }}>
                  <Text style={styles.ButtonText}>멘토 연결하기</Text>
                </TouchableOpacity>
              </SafeAreaView>
              <SafeAreaView style = {{flexDirection : 'row'}}>
                  <Image source={MajorIcon} style={{ marginTop: 15, marginLeft: 15, width: 18, height: 18, marginBottom: 15, }} />
                  <Text style = {styles.Major}>{majorName}</Text>
              </SafeAreaView>
              <SafeAreaView style = {{flexDirection : 'row'}}>
              <Image source={TeachIcon} style={{ marginLeft: 15, width: 18, height: 18, marginBottom: 15, }} />
              <Text style = {styles.Lectures}>{lectureName1}{'\n'}{lectureName2}</Text>
              </SafeAreaView>
              <SafeAreaView style={{ flexDirection: 'row' }}>
                <Image source={EmailIcon} style={{ marginLeft: 15, width: 18, height: 18 }} />
                <Text style={styles.EmailAddress}>{Profile.email}</Text>
              </SafeAreaView>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={{ marginTop: 30, borderBottomColor: '#a0a0a0', borderBottomWidth: .5 }} />
          <ScrollView style={{ marginHorizontal: 20 }}>
            <SafeAreaView style={{ flexDirection: 'row', height: 100, }}>
              <Text style={styles.IntroduceMyself}>자기소개</Text>
              <Text style={styles.IntroduceMyselfText}>{Profile.introduceMyself}</Text>
            </SafeAreaView>
            <SafeAreaView style={{ flexDirection: 'row', height: 80, }}>
              <Text style={styles.LivingWhere}>거주지</Text>
              <Text style={styles.LivingWhereText}>{Profile.livingWhere}</Text>
            </SafeAreaView>
            <SafeAreaView style={{ flexDirection: 'row', height: 100, }}>
              <Text style={styles.Major2}>멘토 분야</Text>
              <Text style={styles.MajorText}>{LectureList[0]?.name}, {LectureList[1]?.name}</Text>
            </SafeAreaView>
            <SafeAreaView style={{ flexDirection: 'row' }}>
              <Text style={styles.Teach}>멘토링 설명</Text>
              <Text style={styles.TeachText}>{Profile.mentoringContents}</Text>
            </SafeAreaView>
          </ScrollView>
        </Card>
      </SafeAreaView>
    );
  else {
    return (
      <View></View>
    )
  }
};

const styles = StyleSheet.create({
  CardStyle: {
    width: 400,
    height: 680,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderColor: '#a0a0a0',
    borderWidth: .5,
  },
  NickName: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: 'black',
    marginLeft: 30,
    marginTop: 5,
  },
  EmailAddress: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    color: 'black',
    marginLeft: 20,
  },
  Lectures: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
    marginLeft: 20,
  },
  Major: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    marginTop : 15,
    color: 'black',
    marginLeft: 20,
  },
  Major2: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    marginTop : 15,
    color: 'black',
    marginLeft: 18,
  },
  ChatButton: {
    width: 110,
    height: 45,
    backgroundColor: '#27BAFF',
    borderRadius: 3,
    marginLeft: 100,
    marginRight : 30,

  },
  ButtonText: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  IntroduceMyself: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  IntroduceMyselfText: {
    fontFamily: 'NanumSquareRound',
    fontSize: 15,
    color: 'black',
    marginTop: 20,
    marginLeft: 18,
    flex: 1,
    flexWrap: 'wrap',
  },
  LivingWhere: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    color: 'black',
    marginLeft: 18,
    marginTop: 20,
    marginRight: 50,
  },
  LivingWhereText: {
    fontFamily: 'NanumSquareRound',
    fontSize: 15,
    color: 'black',
    marginTop: 20,
    flex: 1,
    flexWrap: 'wrap',
  },
  MajorText: {
    fontFamily: 'NanumSquareRound',
    fontSize: 15,
    marginLeft : 15,
    color: 'black',
    marginTop: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
  Teach: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: 15,
    color: 'black',
    marginLeft: 18,
    marginTop: 20,
    marginRight: 20,
  },
  TeachText: {
    fontFamily: 'NanumSquareRound',
    fontSize: 15,
    color: 'black',
    marginTop: 20,
    flex: 1,
    flexWrap: 'wrap',

  }

});

export default MentorProfileDetailFromReply;