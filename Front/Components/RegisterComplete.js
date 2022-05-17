import React from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import {TouchableOpacity } from 'react-native';
import 'react-navigation';
import logo from '../icons/PickMenLogo.png';
function RegisterComplete({navigation}) {
    return(
            <View>
                <View>
                    <Text style = {styles.Text}>
                        회원가입이 완료되었습니다!
                    </Text>
                </View>
                <TouchableOpacity style={styles.startButton} 
                    onPress = {() => navigation.navigate('Start')}>
                    <Text style={styles.ButtonText}>처음으로</Text>
                </TouchableOpacity>  
            </View>
    )
}
const styles = StyleSheet.create({
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
       color : "#27BAFF",
       textAlign : "center",
       marginTop : 250,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 28,
       fontFamily : 'Jalnan',
   },
   ButtonText:{
    color : "#FFFFFF",
    textAlign : "center",
    paddingLeft : 10,
    paddingRight : 10,
    marginTop : 4,
    fontSize : 18,
    fontFamily : 'Jalnan',
}
  });

export default RegisterComplete;