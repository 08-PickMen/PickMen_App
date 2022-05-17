import React from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import {TouchableOpacity } from 'react-native';
import 'react-navigation';
import logo from '../icons/PickMenLogo.png';
import Test from '../utils/utils';
function Testpage({navigation}) {
    return(
            <View>
                <View>
                <Image source={logo} style={styles.logoStyle}></Image>
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
   }
  });

export default Testpage;