import React from 'react';
import ImagePicker  from 'react-native-image-picker';
import {View, Text, Image, Button} from 'react-native';

function ImageUpload() {
    const [image, setImage] = React.useState(null);

    ImagePicker.launchImageLibrary({noData : true}, (response) => {
        if(response.uri) {
            setImage(response);
        }
    })
}

export default ImageUpload;