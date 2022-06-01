import React, { useEffect } from 'react';
import { View, Text,Image, BackHandler} from 'react-native';
import 'react-navigation';
import logo from '../../../icons/PickMenLogo.png';
import megaphone from '../../../icons/megaphone.png';
// 홈 화면
function Home({navigation}) {
    return(
        <View>
            <View style = {{marginTop : 0.5, borderBottomColor : 'black', borderBottomWidth : 1, borderTopColor : 'black', borderTopWidth : 1, flexDirection : 'row'}}>
                <Image source={megaphone} style = {{marginLeft : 10, width : 40, height : 40,}}/>
                <Text style = {{marginLeft : 20, fontFamily :'Jalnan', paddingTop : 10}}>프로필 수정 기능에 관한 Error 이슈 해결</Text>
            </View>
            <View style={{marginTop : 400, flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : '#fff'}}>
                <Image source = {logo} style = {{width : 300, height : 300, borderRadius : 40,}}/>
            </View>
            </View>
    )
}


export default Home;