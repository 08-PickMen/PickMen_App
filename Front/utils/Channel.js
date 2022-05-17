import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFirestoreQuery} from './FirebaseQuery';

function Channel() {
    messagesRef = firestore().collection(`messages-${id}`);
    const messages = useFirestoreQuery(messagesRef)

}