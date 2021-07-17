import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {styles, color} from '../assets/style/style';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Server, convertToURLEncoded} from '../config/config';

const Register = ({navigation}) => {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = () => {
    const data = {
      nik: nik,
      nama: nama,
      alamat: alamat,
      username: username,
      password: password,
      email: email,
    };
    if (
      nik !== '' ||
      nama !== '' ||
      alamat !== '' ||
      username !== '' ||
      password !== '' ||
      email !== ''
    ) {
      // ToastAndroid.show('Berhasil Daftar, Silahkan Login', ToastAndroid.LONG);
      // navigation.replace('Login');
      // console.log(JSON.stringify(data))
      const promise = new Promise((resolve, reject) => {
        const fetchTimeout = setTimeout(() => {
          fetch(`${Server}/dpmpstp/api/register`, {
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
                ToastAndroid.show(
                  'Berhasil Daftar, Silahkan Login',
                  ToastAndroid.LONG,
                );
                navigation.replace('Login');
              } else {
                alert(res.message);
              }
            })
            .catch((error) => {
             
            timeout = false;
            if (error) {
              alert(error)
            }
            });
        }, 8000);
        setTimeout(() => {
          console.log(timeout);
          if (timeout) {
            clearTimeout(fetchTimeout);
            reject('Jaringan Buruk');
          } else {
            resolve('Register');
          }
        }, 10000);

        promise.then((res) => console.log(res)).catch((res) => alert(res));
      });
    } else {
      alert('Input Tidak boleh Kosong');
    }
  };

  return (
    <ScrollView>
      <View style={{width: '100%', padding: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="id-card-o" size={20} color={color.secondaryColor} />
          <View style={{width: '80%'}}>
            <TextInput
              placeholder="NIK"
              style={{width: '80%'}}
              keyboardType="number-pad"
              onChangeText={(value) => setNik(value)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="user" size={20} color={color.secondaryColor} />
          <View style={{width: '80%'}}>
            <TextInput
              placeholder="Nama"
              style={{width: '80%'}}
              onChangeText={(value) => setNama(value)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="map-marker" size={20} color={color.secondaryColor} />
          <View style={{width: '80%'}}>
            <TextInput
              placeholder="Alamat"
              // style={{width: '80%'}}
              onChangeText={(value) => setAlamat(value)}
              // multiline
              // numberOfLines={5}
              // style={{textAlignVertical: 'top'}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="user" size={20} color={color.secondaryColor} />
          <View style={{width: '80%'}}>
            <TextInput
              placeholder="Username"
              style={{width: '80%'}}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="lock" size={20} color={color.secondaryColor} />
          <View style={{width: '80%'}}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
              style={{width: '80%'}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="envelope-o" size={20} color={color.secondaryColor} />
          <View style={{width: '80%'}}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
              style={{width: '80%'}}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={register}
          style={{
            backgroundColor: color.primaryColor,
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 4,
            width: '90%',
          }}>
          <Text style={{color: color.lightColor, textAlign: 'center'}}>
            Register
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={{textAlign: 'center', marginTop: 20, color: 'grey'}}>
            Kehalaman &nbsp;
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: color.primaryColor,
                }}>
                Login
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
