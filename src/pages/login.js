import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { color, styles } from '../assets/style/style';
import Icons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Server, convertToURLEncoded } from '../config/config';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);



  const login = () => {


    let data = {
      'username': username,
      'password': password
    }

    var timeout = true;
    const promise = new Promise((resolve, reject) => {
      const fetchTimeout = setTimeout(() => {
        fetch(`${Server}/dpmpstp/api/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then((res) => {
            timeout = false;
            if (res.status) {
              const data = res.data[0]
              AsyncStorage.setItem('id_user', data.id_user)
              navigation.replace('Tab')
            } else {
              alert(res.message)
            }
          }).catch(error => {
            timeout = false;
            if (error) {
              alert(error)
            }
          })

      }, 5000)
      setTimeout(() => {
        console.log(timeout)
        if (timeout) {
          clearTimeout(fetchTimeout);
          reject('Jaringan Buruk')
        } else {
          resolve('Login')
        }
      }, 10000)

    })

    promise
      .then(res => console.log(res))
      .catch(res => alert(res))

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color.primaryColor}
        animated
        showHideTransition="slide"
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Image
          source={require('../assets/icon/logo.png')}
          style={{ width: 80, height: 80 }}
        />
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
          <Icons name="user" style={{ padding: 10 }} size={20} color={color.secondaryColor} />
          <View style={{ width: '70%' }}>
            <TextInput
              placeholder="Username"
              keyboardType="default"
              onChangeText={(value) => setUsername(value)}
              blurOnSubmit={false}

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
            borderRadius: 4,
            borderColor: color.primaryColor,
          }}>
          <Icons name="lock" style={{ padding: 10 }} size={20} color={color.secondaryColor} />
          <View style={{
            width: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <TextInput
              placeholder="Password"
              style={{ width: '90%' }}
              secureTextEntry={!show}
              onChangeText={(value) => setPassword(value)}
              blurOnSubmit={false}

            />
            <View>
              <Icons
                name={
                  password.length > 0 ? (show ? 'eye-slash' : 'eye') : null
                }
                size={15}
                color={color.primaryColor}
                onPress={() => setShow(!show)}
                style={{ marginRight: 10 }}
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
            onPress={login}
            style={{
              backgroundColor: color.primaryColor,
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: 20,
              paddingRight: 20,
              width: '80%',
              borderRadius: 4,
              marginTop: 10
            }}>
            <Text style={{ color: color.lightColor, textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 10, color: 'grey' }}>
          Belum Punya Akun ?&nbsp;
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: color.primaryColor,
              }}>
              Daftar
            </Text>
          </TouchableWithoutFeedback>
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('PanduanDaftar')} style={{marginVertical:10}}>
            <Text style={{textDecorationLine:'underline',color: color.primaryColor,fontWeight:'bold'}}>Panduan Pendaftaran</Text>
        </TouchableOpacity>

      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
