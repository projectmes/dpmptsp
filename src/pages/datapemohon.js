import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Server, convertToURLEncoded} from '../config/config';
import ListPemohon from '../component/listPemohon';
import {styles, color} from '../assets/style/style';

const DataPemohon = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // let data = [
    //   {
    //     id_mohon: 1,
    //     nama_pemohon: 'Nama Pemohon 1',
    //     nama_perusahaan: 'Nama Perusahaan',
    //     tgl_mohon: '2021-01-07',
    //   },
    //   {
    //     id_mohon: 2,
    //     nama_pemohon: 'Nama Pemohon 2',
    //     nama_perusahaan: 'Nama Perusahaan',
    //     tgl_mohon: '2021-01-07',
    //   },
    //   {
    //     id_mohon: 3,
    //     nama_pemohon: 'Nama Pemohon 3',
    //     nama_perusahaan: 'Nama Perusahaan',
    //     tgl_mohon: '2021-01-07',
    //   },
    //   {
    //     id_mohon: 4,
    //     nama_pemohon: 'Nama Pemohon 4',
    //     nama_perusahaan: 'Nama Perusahaan',
    //     tgl_mohon: '2021-01-07',
    //   },
    // ];
    const loadData = async () => {
      var timeout = false;
      // setData(data)
      const id_user = await AsyncStorage.getItem('id_user');
      const promise = new Promise((resolve, reject) => {
        const fetchTimeout = setTimeout(() => {
          fetch(`${Server}/dpmpstp/api/permohonan/user_id/${id_user}`)
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                setData(res);
              }
            })
            .catch((error) => {
              timeout = false;
              if (error) {
                alert(error);
              }
            });
        },5000);
        setTimeout(() => {
          console.log(timeout);
          if (timeout) {
            clearTimeout(fetchTimeout);
            reject('Jaringan Buruk');
          } else {
            resolve('Pemohon');
          }
        }, 10000);
      });
      promise.then((res) => console.log(res)).catch((res) => alert(res));
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: color.lightColor,
        }}
        renderItem={({item, index}) => (
          <ListPemohon
            uri={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${item.id_permohonan}`}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id_permohonan.toString()}
      />
    </View>
  );
};

export default DataPemohon;
