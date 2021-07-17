import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {color, styles} from '../assets/style/style';

const ListPemohon = ({uri, item}) => {
  const permissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        downloadImage();
      }
    } catch (err) {
      alert('Storage Permission Not Granted');
      console.log(err)
    }
  };

  const downloadImage = () => {
    let image_URL = uri;
    const {config, fs} = RNFetchBlob;
    let date = new Date();
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        appendExt: 'jpg',
        path:
          PictureDir +
          '/image_permohonan' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          '.jpg',
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        alert('Image Downloaded Successfully.');
      });
  };

  const twoDigits = (number) => {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  };

  const date = (date) => {
    var myDate = new Date(date);
    const dateFormatted =
      twoDigits(myDate.getDate()) +
      '/' +
      twoDigits(myDate.getMonth() + 1) +
      '/' +
      twoDigits(myDate.getFullYear());
    return dateFormatted;
  };

  return (
    <View style={(styles.container, {padding: 10})}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: uri}} style={{width: 130, height: 130}} />
        <View style={{paddingLeft: 5, width: '60%'}}>
          <Text>ID : {item.id_permohonan}</Text>
          <Text>Pemohon : {item.nama_pemohon}</Text>
          <Text>Perusahaan : {item.nama_usaha}</Text>
          <Text>Tanggal Mohon : {date(item.date_create)}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={permissions}
        style={{
          backgroundColor: color.secondaryColor,
          padding: 8,
          borderRadius: 10,
          width: '100%',
          bottom: 0,
          marginVertical:10,
        }}>
        <Text style={{color: color.lightColor, textAlign: 'center'}}>
          Simpan QRCode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListPemohon;
