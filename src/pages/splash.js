import React, {useEffect} from 'react';
import {View, Image, Text, StatusBar, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from '../assets/style/style';

const Splash = ({navigation}) => {
  const auth = async () => {
    let token = await AsyncStorage.getItem('id_user');
    console.log(token);
    if (token) {
      navigation.replace('Tab');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => auth(), 3000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar
        backgroundColor={color.primaryColor}
        animated
        showHideTransition="slide"
      />
      <Image
        source={require('../assets/icon/logo.png')}
        style={{width: 150, height: 150}}
      />
    </SafeAreaView>
  );
};

export default Splash;
