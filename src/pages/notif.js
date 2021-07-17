import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {StackActions, CommonActions} from '@react-navigation/native';
import SuccesIcon from 'react-native-vector-icons/Feather';
import {styles, color} from '../assets/style/style';

const Notif = ({navigation}) => {
  function handleBackButton() {
    // navigation.goBack();
    return true;
  }

  const navigateProfil = () => {
    navigation.dispatch(CommonActions.navigate('Tab', {
        screen: 'Profil', 
  }))
};

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}>
        <SuccesIcon name="check-circle" size={50} color={'#2adb16'} />
        <Text style={{color: '#2adb16', fontSize: 25, fontWeight: 'bold'}}>
          Sukses
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text>
          Permohonan Izin Telah Di Tambahkan, Silahkan ke Menu
          <Text style={{fontWeight: 'bold'}}>
            {' '}
            Profil&rarr;Daftar Permohonan
          </Text>
          <Text> Untuk melihat lebih lengkap.</Text>
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tab')}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            marginVertical: 10,
            borderColor: color.primaryColor,
          }}>
          <Text style={{color: color.primaryColor}}>Kembali Ke Izin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateProfil}
          style={{
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            marginVertical: 10,
            backgroundColor: color.primaryColor,
          }}>
          <Text style={{color: color.lightColor}}>Ke Menu Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notif;
