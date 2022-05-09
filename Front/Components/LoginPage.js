import React from 'react';
import { View, Text, StyleSheet , TextInput} from 'react-native';
import {TouchableOpacity } from 'react-native';
import 'react-navigation';

function LoginPage({navigation}) {
    return(
            <View>
                <View>
                    <Text style = {styles.Text}>
                        PickMen 로그인하기
                    </Text>
                </View>
                <View>
                <TextInput style = {styles.TextInput} placeholder = "Email Address"/>
                <TextInput style = {styles.TextInput} placeholder = "Password"/>
                </View>
                <TouchableOpacity style={styles.startButton} 
                    onPress = {() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.ButtonText}>Login</Text>
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
    marginTop : 100,
    borderRadius:5,

    backgroundColor : "#27BAFF"
   },
   Text:{
       color : "#27BAFF",
       textAlign : "center",
       marginTop : 150,
       paddingLeft : 10,
       paddingRight : 10,
       fontSize : 28,
       marginBottom : 60,
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
},
    TextInput: {
        width : 320,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginBottom : 20
    },
  });

export default LoginPage;