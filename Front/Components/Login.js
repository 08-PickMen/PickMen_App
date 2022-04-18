import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';

function loginPage({ navigation}) {
    return(
        <View style={styles.total}>
            <View style={styles.AppName}>
                <Image source={require('../logo.jpg')} style={styles.logo}/>
                </View>
                <View style={styles.Button}>
                    <Button
                        type = "outline"
                        title = "Login"
                        containerStyle = {{ width : 150, heigh : 105, margin : 5 }}
                        titlestyle = {{ fontSize : 50, fontWeight : 'bold' }}
                        onPress = {() => navigation.navigate('Login')}
                        />
                        </View>
                        <View style={styles.Button}>
                        <Button
                        type = "outline"
                        title = "Register"
                        containerStyle = {{ width : 150, heigh : 105, margin : 5 }}
                        titlestyle = {{ fontSize : 50, fontWeight : 'bold' }}
                        onPress = {() => navigation.navigate('Resgister')}
                        />
                        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    total: {
      flex: 0.5,
    },
    AppName: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'skyblue',
    },
    Buttons: {
      flex: 4.5,
      backgroundColor: 'yellow',
    },
    logo: {
      flex: 3,
      width: 380,
      height: 200,
    },
  });
export default loginPage;