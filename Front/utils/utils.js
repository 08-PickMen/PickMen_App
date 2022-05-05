import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from 'axios';

const json = JSON.stringify({email: 'lop1322@ajou.ac.kr'})

function Test() {
    api.post('http://10.0.2.2:8090/auth/send',null, { params: {
        email: 'lop1322@ajou.ac.kr'
    }})
    .then(res => {
        console.log(res);
    }
    ).catch(err => {
        console.log(err);
    })
    return (
        <View>
            <Text>This is Page for Test Unit</Text>
        </View>
    )
}

export default Test;