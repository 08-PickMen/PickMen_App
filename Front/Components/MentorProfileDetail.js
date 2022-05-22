import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet, Touchable, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Card} from 'react-native-paper'
import {Avatar} from 'react-native-elements';
import axios from 'axios';
import TeachIcon from '../icons/teach.png';
import MajorIcon from '../icons/Major.png';
import EmailIcon from '../icons/email.png';

const MentorProfileDetail = ({navigation, route}) => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const [Profile, setProfile] = useState([]);
  const [Loading, setLoading] = useState(true);
  const bodyText = "This is not really a bird nest.";
  const mentor_id = route.params.item_id;

  useEffect(() => {
      setLoading(false);
      axios.get('http://10.0.2.2:8090/mentor/'+Number(mentor_id)).then(response => {
        setProfile(response.data);
      }).catch(error => {
        console.log(error)
      })
      setLoading(true);
  },[])

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };
  if(Loading==true)
    return (
      <View style = {{flex : 1, backgroundColor : '#fff'}}>
        <Card style = {styles.CardStyle}>
          <View style = {{marginLeft : 15, marginTop : 20,flexDirection : 'row'}}>
            <Avatar rounded source = {{uri : 'http://10.0.2.2:8090/getProfile?userid='+mentor_id}} size = 'large'/>
            <View>
              <View style = {{flexDirection : 'row'}}>
                <Text style = {styles.NickName}>{Profile.nickname}</Text>
                <TouchableOpacity style = {styles.ChatButton}>
                  <Text style = {styles.ButtonText}>멘토 연결하기</Text>
                </TouchableOpacity>
              </View>
              <Image source={MajorIcon} style = {{marginTop : 15,marginLeft : 15, width : 18, height : 18,marginBottom : 15,}}/>
              <Image source={TeachIcon} style = {{marginLeft : 15, width : 18, height : 18,marginBottom : 15,}}/>
              <View style = {{flexDirection : 'row'}}>
                <Image source={EmailIcon} style = {{marginLeft : 15, width : 18, height : 18}}/>
                <Text style = {styles.EmailAddress}>{Profile.email}</Text>
              </View>
            </View>
          </View>
          <View style ={{marginTop : 30,borderBottomColor : '#a0a0a0', borderBottomWidth : .5}}/>
        </Card>
      </View>
    );
  else {
    return(
    <View></View>
    )
  }
};

const styles = StyleSheet.create({
  CardStyle : {
    width : 400,
    height : 680,
    marginLeft : 'auto',
    marginRight : 'auto',
    marginTop : 'auto',
    marginBottom : 'auto',
    borderColor : '#a0a0a0',
    borderWidth : .5,
  },
  NickName : {
    fontFamily : 'Jalnan',
    fontSize : 15,
    color : 'black',
    marginLeft : 30,
    marginTop : 5,
  },
  EmailAddress : {
    fontFamily : 'NanumSquareRoundB',
    fontSize : 15,
    color : 'black',
    marginLeft : 20,
  },
  ChatButton : {
    width : 110,
    height : 45,
    backgroundColor : '#27BAFF',
    borderRadius : 3,
    marginLeft : 100,

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
  }
});

export default MentorProfileDetail;