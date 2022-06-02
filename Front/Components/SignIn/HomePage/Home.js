import React, { useEffect, useState } from 'react';
import { View, Text, Image, BackHandler, FlatList, StyleSheet, Dimensions} from 'react-native';
import 'react-navigation';
import logo from '../../../icons/PickMenLogo.png';
import megaphone from '../../../icons/megaphone.png';
import Swiper from 'react-native-swiper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
// 홈 화면
function Home({ navigation }) {
    const [sliderTime, setSliderTime] = useState(1);
    const bannerList = ['hello', 'hello2', 'hello3', 'hello4'];
    useEffect(() => {
        const autoTimer = setTimeout(() => setSliderTime(6), 1000);
        return () => clearTimeout(autoTimer);
    }, [])
    const renderItem = ({ item }) => {
        return (
            <View style = {{width : 400, justifyContent: 'center'}}>
                <Text style = {{fontSize: 200 * 0.5, textAlign: 'center'}}>{item}</Text>
            </View>
        )
    }
    return (
        <View style = {{ flex: 1, backgroundColor: 'white' }}>
            <SwiperFlatList
                autoplay = {true}
                autoplayDelay = {sliderTime}
                data = {bannerList}
                autoplayLoop = {true}
                index = {0}
                renderItem = {renderItem}/>
                <View style = {{flex : 1}}>
                <Text>Test 화면</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})


export default Home;