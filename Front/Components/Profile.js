import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


function Profile() {
    const [url, setUrl] = React.useState('');
    async function TestImage() {
        var user_id = await AsyncStorage.getItem('user_id');
        var data = '';
        axios.get('http://10.0.2.2:8090/getProfile', {
            params : {
                userid : Number(user_id),
            }
        }
        ).then(async function(response) {
            data = JSON.stringify(response.request._url)
            await AsyncStorage.setItem('ProfileImage', data);
        })
    }
    async function loadImage() {
        var data = await AsyncStorage.getItem('ProfileImage');
        setUrl(data);
    }
    console.log(url)
    return(
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <TouchableOpacity onPress={()=>loadImage()}>
                    <Text>Test</Text>
                </TouchableOpacity>
            <Image source ={{uri : String(url)}} style = {{width : 200, height : 200}}></Image>
            </View>
    )
}


export default Profile;