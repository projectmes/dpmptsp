import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color, styles} from '../assets/style/style';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Server, convertToURLEncoded} from '../config/config';

const Profil = ({navigation}) => {
  const [profil, setProfil] = useState({});
  const [idUser, setIdUser] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    // setProfil({
    //   nik:123123,
    //   nama: 'User',
    //   email: 'User@email.com',
    //   alamat : 'Jl.Halat'
    // })
    // setLoading(false);
    var timeout = true;
    const id_user = await AsyncStorage.getItem('id_user');
    setIdUser(id_user);
    // try {

    const promise = new Promise((resolve, reject) => {
      const fetchTimeout = setTimeout(() => {
        fetch(`${Server}/dpmpstp/api/user/id_user/${id_user}`)
          .then((res) => res.json())
          .then((res) => {
            setProfil(res[0]);
            timeout = false;
            setLoading(false);
          })
          .catch((error) => {
            timeout = false;
            if (error) {
              alert(error)
            }
          });
      }, 5000);
      setTimeout(() => {
        if (timeout) {
          clearTimeout(fetchTimeout);
          reject('Jaringan Buruk');
        } else {
          resolve('Profil');
        }
      }, 10000);

      // } catch (err) {
      //   alert(err);
      // }
    });
    promise.then((res) => console.log(res)).catch((res) => alert(res));
  };

  useEffect(() => {
    loadProfile();
    // Refreshing LoadProfile
    const listener = navigation.addListener('focus', () => {
      loadProfile();
    });
    return () => {
      listener;
    };
  }, []);

  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.primaryColor}
        animated
        showHideTransition="slide"
      />

      {/* Loading */}

      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: color.lightColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={color.primaryColor} animating={loading} />
        </View>
      ) : (
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: '#e3e3e3',
            }}>
            <View style={{width: 105}}>
              <Icons name="user-circle-o" size={80} />
            </View>
            <View style={{width: '60%'}}>
              <Text style={{color: color.darkColor, flexWrap: 'wrap'}}>
                {profil.nama}
              </Text>
              <Text style={{color: '#d1d1d1'}}>{profil.nik}</Text>
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
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <View style={{width: 30}}>
                <Icons name="envelope-o" size={20} />
              </View>
              <View>
                <Text style={{color: color.darkColor, flexWrap: 'wrap'}}>
                  {profil.email}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 30}}>
                <Icons name="map-marker" size={20} />
              </View>
              <View style={{width: '90%'}}>
                <Text style={{color: color.darkColor, flexWrap: 'wrap'}}>
                  {profil.alamat}
                </Text>
              </View>
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              <View style={{width: 30}}>
                <Icons name="list-alt" size={20} />
              </View>
              <View style={{width: '90%'}}>
                <Text style={{color: color.darkColor, flexWrap: 'wrap'}}>
                  Daftar Permohonan Izin
                </Text>
              </View>
            </View> */}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DataMohon')}
            style={{
              borderBottomWidth: 1,
              padding: 10,
              borderColor: color.secondaryColor,
            }}>
            <Text style={{color: color.primaryColor}}>
              Daftar Permohonan Izin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              padding: 10,
              borderColor: color.secondaryColor,
            }}>
            <Text style={{color: color.primaryColor}} onPress={logout}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Profil;
