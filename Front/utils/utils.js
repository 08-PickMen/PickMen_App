import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from 'axios';

function Test() {
    api.get('http://10.0.2.2:8090/auth/test')
    .then(res => {
        console.log(res);
    }
    ).catch(err => {
        console.log(err);
    })
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default Test;