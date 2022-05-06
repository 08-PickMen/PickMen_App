import React from 'react';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import api from 'axios';

function showLog(data) {
    Alert.alert(
        '인증번호 확인',
        'ㄹㅇ',[
            {
                text : 'yes',
                onPress: () => console.log(data),
                style : 'cancel'
            }
        ]
    )
}

function Test(text) {
    const [data, setData] = React.useState([]);
    api.post('http://10.0.2.2:8090/auth/send',null, { params: {
        email: text
    }})
    .then(function(response){
        showLog(response.data)
    }
    )
}

export default Test;