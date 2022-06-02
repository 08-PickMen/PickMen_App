import React , {useEffect} from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import {TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-navigation';
import logo from '../../icons/PickMenLogo.png';
function Start({navigation}) {
    useEffect(() => {
        AsyncStorage.getAllKeys().then(keys => {
            AsyncStorage.multiRemove(keys);
        });
    },[]);
    return(
            <View style = {{flex : 1, backgroundColor : '#27BAFF'}}>
                <View style = {styles.PageStyle}>
                <View>
                <Image source={logo} style={styles.logoStyle}></Image>
                </View>
                <TouchableOpacity style={styles.startButton} 
                    onPress = {() => navigation.navigate('Purpose')}>
                    <Text style={styles.Text}>가입하기</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection : 'row', marginTop : 10}}>
                    <Text style={{
                    marginLeft : 'auto',
                    paddingLeft : 10,
                    paddingRight : 10,
                    fontSize : 15,
                    fontFamily : 'Jalnan',
                }}>이미 계정이 있으시다면?</Text>
                <Text style={{
                    paddingLeft : 10,
                    paddingRight : 10,
                    fontSize : 15,
                    color : '#27BAFF',
                    marginRight : 'auto',
                    fontFamily : 'Jalnan',
                }} onPress={()=> navigation.navigate('LoginPage')}>로그인하기</Text>
                </View>
                </View>  
            </View>
    )
}
const styles = StyleSheet.create({
   logoStyle: {
       width : 300,
       height : 300,
       marginLeft : 'auto',
       marginRight : 'auto',
       marginTop : 70,
       borderRadius : 90,
       borderColor : '#27BAFF',
   },
   startButton:{
    width : 280, 
    height : 40,
    paddingTop : 5, 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 200,
    borderRadius:5,

    backgroundColor : "#27BAFF"
   },
   Text:{
       color : "white",
       textAlign : "center",
       marginTop : 5,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 15,
       fontFamily : 'Jalnan',
   },
   PageStyle:{
    backgroundColor : 'white',
    width : 380, 
    height : 720,
    borderColor : 'white', 
    borderWidth : 1, 
    borderRadius : 30,
    marginLeft : 'auto', 
    marginRight : 'auto', 
    marginTop : 'auto', 
    marginBottom : 'auto'
  },
  });

export default Start;