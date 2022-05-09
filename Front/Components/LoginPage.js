import React , {useState} from 'react';
import { View, Text, StyleSheet , TextInput} from 'react-native';
import {TouchableOpacity } from 'react-native';
import 'react-navigation';
import axios  from 'axios';


function LoginPage({navigation}) {
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');
    function LoginAccess(email, password) {
       axios.post('http://10.0.2.2:8090/auth/loginProc',{ params: {
           username: email,
            password: password
       }}).then(response => {
              console.log('hello')
              console.log(response.data);
    }).catch(function(error){
        console.log(error)
    })
    }
    return(
            <View>
                <View>
                    <Text style = {styles.Text}>
                        PickMen 로그인하기
                    </Text>
                </View>
                <View>
                <TextInput style = {styles.TextInput} placeholder = "Email Address" onChangeText={(UserEmail)=> setEmail(UserEmail)}/>
                <TextInput secureTextEntry={true} style = {styles.TextInput} placeholder = "Password" onChangeText={(password)=> setPassword(password)}/>
                </View>
                <TouchableOpacity style={styles.startButton} 
                    onPress = {()=> {
                        LoginAccess(email, password);
                        navigation.navigate('HomeScreen');
                    }}>
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