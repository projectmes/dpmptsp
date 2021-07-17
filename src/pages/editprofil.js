import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color, styles} from '../assets/style/style';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Server, convertToURLEncoded} from '../config/config';

const EditProfil = ({navigation}) => {
  const [profil, setProfil] = useState({});
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');

  const loadProfile = async () => {
    setNama('Nama');
    setAlamat('Alamat');
    setEmail('User@email.com');
    setNik('123123');
    // const id_user = await AsyncStorage.getItem('id_user');
    // try {
    const id_user = await AsyncStorage.getItem('id_user');
    // try {
    var timeout = false;

    const promise = new Promise((resolve, reject) => {
      const fetchTimeout = setTimeout(() => {
        fetch(`${Server}/dpmpstp/api/user/id_user/${id_user}`)
          .then((res) => res.json())
          .then((res) => {
            let data = res[0];
            setNama(data.nama);
            setAlamat(data.alamat);
            setEmail(data.email);
            setNik(data.nik);
          })
          .catch((error) => {
            alert(error);
          });
      }, 5000);
      setTimeout(() => {
        console.log(timeout);
        if (timeout) {
          clearTimeout(fetchTimeout);
          reject('Jaringan Buruk');
        } else {
          resolve('Edit Profil');
        }
      }, 10000);

    });
    promise.then((res) => console.log(res)).catch((res) => alert(res));
    // } catch (err) {
    //   alert(err);
    // }
  };

  const saveProfile = async () => {
    alert('Berhasil Edit Profil');
    // navigation.goBack();
    const id_user = await AsyncStorage.getItem('id_user');
    const data = {
      nama: nama,
      email: email,
      alamat: alamat,
      id_user: id_user,
      nik: nik,
    };
    // try {
    fetch(`${Server}/dpmpstp/api/update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      });
    // } catch (err) {
    //   alert(err);
    // }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.primaryColor}
        animated
        showHideTransition="slide"
      />

      {/* Loading */}

      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: '#e3e3e3',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Icons name="user-circle-o" size={80} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: '#e3e3e3',
            marginTop: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icons name="user" size={20} />
            </View>
            <View style={{width: '90%'}}>
              <TextInput
                onChangeText={(value) => setNama(value)}
                style={{
                  color: color.darkColor,
                  padding: 0,
                  width: '100%',
                  borderBottomWidth: 1,
                  borderColor: '#e8e8e8',
                }}
                value={nama}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icons name="vcard-o" size={20} />
            </View>
            <View style={{width: '90%'}}>
              <TextInput
                editable={false}
                style={{
                  color: '#d1d1d1',
                  padding: 0,
                  width: '100%',
                  borderBottomWidth: 1,
                  borderColor: '#e8e8e8',
                }}
                value={nik}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icons name="envelope-o" size={20} />
            </View>
            <View style={{width: '90%'}}>
              <TextInput
                onChangeText={(value) => setEmail(value)}
                style={{
                  color: color.darkColor,
                  padding: 0,
                  width: '100%',
                  borderBottomWidth: 1,
                  borderColor: '#e8e8e8',
                }}
                value={email}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icons name="map-marker" size={20} />
            </View>
            <View style={{width: '90%'}}>
              <TextInput
                onChangeText={(value) => setAlamat(value)}
                style={{
                  color: color.darkColor,
                  padding: 0,
                  width: '100%',
                  borderBottomWidth: 1,
                  borderColor: '#e8e8e8',
                }}
                value={alamat}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={saveProfile}
            style={{
              backgroundColor: color.primaryColor,
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: color.lightColor}}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfil;
