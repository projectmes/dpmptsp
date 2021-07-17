import React from 'react';
import {View, Text, TextInput,Image,StyleSheet,StatusBar,Dimensions } from 'react-native';

import { color, styles } from '../assets/style/style';
import Icons from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';

const HEIGHT = Dimensions.get("window").height;

const slides = [
  {
    key: '1',
    title: 'Panduan Pendaftaran',
    text: 'Tekan Daftar pada tampilan login',
    image: require('../assets/image/login.png'),
    backgroundColor: '#fcba03',
    color : '#fff'
  },
  {
    key: '2',
    title: 'Panduan Pendaftaran',
    text: 'Tampilan Daftar',
    image: require('../assets/image/register.png'),
    backgroundColor: '#ff9642',
    color : '#fff'
  },
  {
    key: '3',
    title: 'Panduan Pendaftaran',
    text: 'Masukkan NIK pada Kartu Identitas Anda seperti KTP',
    image: require('../assets/image/nik.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
  {
    key: '4',
    title: 'Panduan Pendaftaran',
    text: 'Masukkan Nama Lengkap Anda',
    image: require('../assets/image/nama.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
  
  {
    key: '5',
    title: 'Panduan Pendaftaran',
    text: 'Masukkan Alamat Lengkap Anda',
    image: require('../assets/image/alamat.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
  
  {
    key: '6',
    title: 'Panduan Pendaftaran',
    text: 'Masukkan Username. Username akan digunakan pada saat menggunakan aplikasi. Contoh : budi123',
    image: require('../assets/image/username.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
  
  {
    key: '7',
    title: 'Password',
    text: 'Masukkan Password untuk keamanan. Password akan digunakan juga pada saat menggunakan aplikasi.',
    image: require('../assets/image/password.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
  
  {
    key: '8',
    title: 'Panduan Pendaftaran',
    text: 'Masukkan Email jika ada.',
    image: require('../assets/image/email.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
  
  {
    key: '9',
    title: 'Mari Mulai',
    text: 'Setelah Semua telah di isi, tekan register untuk melakukan pendaftaran',
    image: require('../assets/image/btnRegister.png'),
    backgroundColor: '#fff8cd',
    color : '#ff9642'
  },
];


const PanduanDaftar = ({navigation}) => {
  const onDone = () => {
    navigation.replace('Login');
  };
  const renderItem = ({item}) => {
    return (
      <View key={(item) => item.key} style={{alignItems:'center',flex:1,backgroundColor:'rgba(0,0,0,.1)',padding:10}}>
        <Text>
          {item.title}
        </Text>
        <Image source={item.image} style={{height:HEIGHT-360,resizeMode:'contain',width:'80%',marginVertical:20}}/>
        <Text>
          {item.text}
        </Text>
      </View>
    );
  };

  const doneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icons name="md-checkmark" color="rgba(255, 255, 255, 1)" 
          size={50} />
      </View>
    );
  };

  const nextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icons
          name="chevron-forward-circle-outline"
          color="rgba(255, 255, 255, 1)"
          size={50}
        />
      </View>
    );
  };

  const prevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icons
          name="chevron-back-circle-outline"
          color="rgba(255, 255, 255, 1)"
          size={50}
        />
      </View>
    );
  };


  return (
    <AppIntroSlider
      data={slides}
      onDone={onDone}
      renderItem={renderItem}
      activeDotStyle={{backgroundColor: color.primaryColor}}
      renderDoneButton={doneButton}
      renderNextButton={nextButton}
      renderPrevButton={prevButton}
      showPrevButton
    />
  );
};

export default PanduanDaftar;
