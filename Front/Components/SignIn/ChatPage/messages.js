import React from 'react';
import { Text } from 'react-native';

function System() {
    return (
        <Text style={{
            fontSize: 12,
            fontFamily: 'Jalnan',
            color: "#27BAFF",
        }}>
            대화방에서는 규정에 따라 적절한 대화를 나누시길 바랍니다.
        </Text>
    )
}

const messages = [
    {
        _id: 0,
        text: System(),
        system: true
    },
    {
        _id: 1,
        text: 'Hello',
        user: {
            _id: 2,
            name: '유저1',
        }
    }
]

export default messages;