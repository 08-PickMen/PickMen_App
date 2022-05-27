import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import 'react-navigation'
function Map({navigation}) {
    const [latitude2, setLatitude2] = useState(null);
    const [longitude2, setLongitude2] = useState(null);
    useEffect(() => {
        var latitude = null;
        var longitude = null;
        Geolocation.getCurrentPosition(
            position => {
                latitude = JSON.stringify(position.coords.latitude);
                longitude = JSON.stringify(position.coords.longitude);

                setLatitude2(latitude);
                setLongitude2(longitude);


            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
        console.log(latitude2, longitude2);
    })
    return(
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude : 37.2830557,
                    longitude : 127.0448373,
                    latitudeDelta : 0.0922,
                    longitudeDelta : 0.0421,
                }}>
                <Marker
                    coordinate={{
                        latitude : 37.2830557,
                        longitude : 127.0448373,
                    }}
                />
            </MapView>
        </View>
    )
}
export default Map;