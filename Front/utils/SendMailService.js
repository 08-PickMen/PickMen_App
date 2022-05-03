import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from 'axios';


function SendMail(text) {
    return(
    api.post('http://10.0.2.2:8090/auth/send',null, { params: {
        email: text
    }})
    .then(res => {
        console.log(res);
    }
    ).catch(err => {
        console.log(err);
    })
    )
}

export default SendMail;