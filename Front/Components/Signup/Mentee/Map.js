import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-navigation'


function Map({ navigation }) {
    const [location, setLocation] = useState({
        latitude: 37.2830557,
        longitude: 127.0448373,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [liveinWhere, setLiveinWhere] = useState('');
    const mapRef = useRef(null);
    const onRegionChange = (region) => {
        setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        })
        console.log(region)
    }
    const getAddress = (latitude, longitude) => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            location.latitude + ',' + location.longitude + '&key=' + 'AIzaSyD_b4PvKJG8CvebhZOuIfsETyXGVxbcN6A&callback=initMap&language=ko'
        ).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson.results[4].formatted_address);
            setLiveinWhere(responseJson.results[4].formatted_address);
        })
    }
    const updateLocation = (Location) => {
        setLocation({
            latitude: Location.lat,
            longitude: Location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }
    async function saveLocation() {
        try {
            await AsyncStorage.setItem('liveinWhere', String(liveinWhere));
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        var latitude = null;
        var longitude = null;
        Geolocation.getCurrentPosition(
            position => {
                latitude = JSON.stringify(position.coords.latitude);
                longitude = JSON.stringify(position.coords.longitude);
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
        if(liveinWhere === ''){
            getAddress(latitude, longitude);
        }

    })
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                onRegionChange={(region) => { onRegionChange(region) }}
                initialRegion={location}
                showsMyLocationButton={true}>
                <Marker
                    coordinate={location} />
            </MapView>
            <View style = {{
                    position: 'absolute',
                    top : '94%',
                    right : '2%',
                    alignSelf: 'flex-end',
                }}>
                    <TouchableOpacity style={styles.Button} onPress={()=>{
                        saveLocation();
                        navigation.navigate('Introduce_Mentor')}}>
                        <Text style={styles.Text}>확인</Text>
                    </TouchableOpacity>
                </View>
            <View style={{
                position: "absolute",
                top: 0,
                alignSelf: "stretch",
                right: 0,
                left: 0,
                flex: 1,
            }}>
                <GooglePlacesAutocomplete
                    placeholder="주소 검색"
                    styles={{
                        textInput: {
                            borderRadius: 0,
                            height: 40,
                        }
                    }}
                    renderRightButton={() => <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            padding: 10,
                            height: 40,
                        }}
                        onPress={() => { mapRef.current.animateToRegion(location, 1000);
                            getAddress(location.latitude, location.longitude);}}>
                        <Text>지도에서 찾기</Text>
                    </TouchableOpacity>}
                    fetchDetails={true}
                    minLength={2}
                    onPress={(data, details = null) => {
                        updateLocation(details.geometry.location);
                    }}
                    query={{
                        key: 'AIzaSyD_b4PvKJG8CvebhZOuIfsETyXGVxbcN6A',
                        language: 'ko',
                    }}>
                </GooglePlacesAutocomplete>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Button: {
        width: 80,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    Text: {
        color: "white",
        textAlign: "center",
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',
    },
})
export default Map;