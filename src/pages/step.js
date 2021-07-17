import React, {useState, useEffect} from 'react';
import {
  ToastAndroid,
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Dimensions,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles, color} from '../assets/style/style';
import {Server, convertToURLEncoded} from '../config/config';

const Step = ({route, navigation}) => {
  const [dataLoad, setDataLoad] = useState([]);
  // const dataLoad = [
  //   'IZIN USAHA LEMBAGA PENEMPATAN TENAGA KERJA SWASTA ANTAR KERJA LOKAL',
  //   'IZIN USAHA LEMBAGA PENYALUR PEKERJA RUMAH TANGGA ANTAR KERJA',
  //   'IZIN AKUPUNTUR',
  //   'IZIN DIETISIEN',
  //   'IZIN DOKTER HEWAN PRAKTIK',
  //   'IZIN KAPAL PENGANGKUT IKAN',
  //   'IZIN LAIK HYGIENE JASA BOGA/CATHERING',
  //   'IZIN LAIK HYGIENE MAKANAN JAJANAN',
  //   'IZIN LAIK HYGIENE PERHOTELAN',
  //   'IZIN LAIK HYGIENE RUMAH MAKAN/ RESTORAN',
  //   'IZIN LAIK HYGIENE SANITAS!I DEPOT AJR MINUM',
  //   'IZIN LINGKUNGAN',
  //   'IZIN LOKASI',
  //   'IZIN MENDIRIKAN BANGUNAN (IMB)',
  //   'IZIN NUTRISIONIS',
  //   'IZIN OPERASIONAL KEGIATAN PEST/TERMITE CONTROL',
  //   'IZIN OPERASIONAL PUSKESMAS',
  //   'IZIN OPERASIONAL RS TIPE C DAN D',
  //   'IZIN PELETAKAN TITIK REKLAME (IPTR)',
  //   'IZIN PEMBUANGAN AIR LIMBAH DAN IZIN PEMANFAATAN AIR LIMBAH',
  //   'IZIN PENDAHULUAN MEMBANGUN (IPM)',
  //   'IZIN PENOAHULUAN MEMBANGUN (IPM) TAMBAHAN',
  //   'IZIN PENDIRIAN RS TIPE C DAN D',
  //   'IZIN PENDIRIAN SEKOLAH DASAR (SD)',
  //   'IZIN PENDIRIAN SEKOLAH MENENGAH PERTAMA (SMP)',
  //   'IZIN PENGUMPULAN LIMBAH B3 SKALA KOTA KECUALI MINYAK PELUMAS/ OLI BEKAS',
  //   'IZIN PENYELENGARAAN KESEHATAN KLINIK PRATAMA',
  //   'IZIN PENYELENGARAAN KESEHATAN KLINIK UTAMA',
  //   'IZIN PENYELENGARAAN PELAYANAN RADIOLOGI DIAGNOSTIK',
  //   'IZIN PENYELENGGARAAN ANGKUTAN PERKOTAAN',
  //   'IZIN PENYELENGGARAAN ANGKUTAN UMUM',
  //   'IZIN PENYELENGGARAAN PANTI SEHAT',
  //   'IZIN PENYELENGGARAAN PELAYANAN HEMODIALISIS',
  //   'IZIN PENYIMPANAN SEMENTARA LIMBAH B3 UNTUK PENGHASIL',
  //   'IZIN PERAWAT GERIATRI',
  //   'IZIN PERAWAT KESEHATAN ANAK',
  //   'IZIN PERAWAT KESEHATAN JIWA',
  //   'IZIN PERAWAT MATERNITAS',
  //   'IZIN PERAWAT MEDICAL BEDAH',
  //   'IZIN PERLUASAN KAWASAN INDUSTRI (IPKI)',
  //   'IZIN PERLUASAN USAHA INDUSTRI (IPUI)',
  //   'IZIN PERUSAHAAN PERGEKALAN KESEHATAN RUMAH TANGGA TERTENTU (PKRT)',
  //   'IZIN PRAKTIK PROMOSI KESEHATAN DAN ILMU PERILAKU',
  //   'IZIN SALON KECANTIKAN',
  //   'IZIN TEMPAT PENAMPUNGAN BEKERJA MIGRAN INDONESIA',
  //   'IZIN TENAGA ADMINISTRASI DAN KEBIJAKAN KESEHATAN',
  //   'IZIN TENAGA AUDIOLOGIS',
  //   'IZIN TENAGA KESEHATAN MASYARAKAT',
  //   'IZIN TENAGA KESEHATAN REPROOUKSI DAN KELUARGA',
  //   'IZIN TENAGA KESEHATAN TRADISIONAL KETERAMPILAN',
  //   'IZIN TENAGA KESEHATAN TRADISIONAL RAMUAN',
  //   'IZIN TENAGA TEKNIS PELAYANAN DARAH',
  //   'IZIN TOKO ALAT KESEHATAN',
  //   'IZIN TRAYEK',
  //   'IZIN TUKANG GIGI',
  //   'IZIN UNIT TRANSFUSI DARAH RUMAH SAKIT',
  //   'IZIN USAHA ANGKUTAN (IUA)',
  //   'IZIN USAHA INDUSTRI (IUI)',
  //   'IZIN USAHA INDUSTRI KECIL (IUIK)',
  //   'IZIN USAHA INDUSTRI MENENGAH DAN BESAR',
  //   'IZIN USAHA PEMOTONGAN HEWAN dan / UNIT PENANGANAN DAGING',
  //   'IZIN USAHA PENGELOLAAN PASAR TRADISONAL (IUPPT)',
  //   'IZIN USAHA PERIKANAN BUDIDAYA',
  //   'IZIN USAHA PUSAT PERBELANJAAN (IUPP)',
  //   'IZIN USAHA SIMPAN PINJAM',
  //   'IZIN USAHA TOKO MODERN (IUTM)',
  //   'KERINGANAN IZIN MENDIRIKAN BANGUNAN (KIMB)',
  //   'KERINGANAN IZIN PENDAHULUAN MEMBANGUN (KIPM)',
  //   'KERINGANAN IZIN PENDAHULUAN MEMBANGUN (KIPM) TAMBAHAN',
  //   'KETERANGAN RENCANA KOTA (KRK)',
  //   'PERPANJANGAN IZIN MEMPEKERJAKAN TENAGA ASING (IMTA)',
  //   'PERSETUJUAN IZIN KURSUS DAN PELATIHAN PENDIDIKAN LUAR SEKOLAH/PENDIDIKAN NON FORMAL',
  //   'PERSETUJUAN IZIN LEMBAGA PELATIHAN KERJA (LPK)',
  //   'PERSETUJUAN IZIN LINGKUNGAN',
  //   'PERSETUJUAN IZIN OPERASIONAL PENDIDIKAN',
  //   'PERSETUJUAN IZIN PEMBUANGAN AIR LIMBAH DAN IZIN PEMANFAATAN AIR LIMBAH',
  //   'PERSETUJUAN IZIN PENGUMPULAN LIMBAH B3 SKALA KOTA KECUALI MINYAK PELUMAS/ OLI BEKAS',
  //   'PERSETUJUAN IZIN PENYELENGARAAN KLINIK',
  //   'PERSETUJUAN IZIN PENYIMPANAN SEMENTARA LIMBAH B3 UNTUK PENGHASIL',
  //   'PERSETUJUAN IZIN USAHA (SIUP)',
  //   'PERSETUJUAN IZIN USAHA JASA KONSTRUKSI (IUJK)',
  //   'PERSETUJUAN IZIN USAHA KAWASAN INDUSTRI (IUKI)',
  //   'PERSETUJUAN IZIN USAHA PENDIDIKAN',
  //   'PERSETUJUAN SERTIFIKASI PRODUKS! PANGAN INDUSTRI RUMAH TANGGA (SPP-IRT)',
  //   'PERSETUJUAN SURAT IZIN APOTEK (SIA)',
  //   'PERSETUJUAN TANDA DAFTAR GUDANG (TDG)',
  //   'PERSETUJUAN TANDA DAFTAR USAHA PARIWISATA (TDUP)',
  //   'SURAT IZIN KERJA TENAGA SANITARIAN ( SIKTS ) FASILITAS KESEHATAN',
  //   'SURAT IZIN KERJA REKAM MEDIS DAN INFORMASI KESEHATAN (SIK) FASILITAS KESEHATAN',
  //   'SURAT IZIN KERJA TEKNISI GIGI (SIKTG)',
  //   'SURAT IZIN KERJA TENAGA GIZI (SIKTGz) FASILITAS KESEHATAN',
  //   'SURAT IZIN KERJA TENAGA GIZI (SIKTGz) MANDIRI',
  //   'SURAT [ZIN MENDIRIKAN LABORATORIUM KESEHATAN KLINIK LABORATORIUM',
  //   'SURAT IZIN MENDIRIKAN RUMAH SAKIT',
  //   'SURAT IZIN OPERASIONAL RUMAH SAKIT UMUM',
  //   'SURAT IZIN PENGELOLAAN PASAR RAKYAT (SIPPR)',
  //   'SURAT IZIN PENYELENGGARAAN OPTIKAL',
  //   'SURAT IZIN PRAKTIK (SIP) DOKTER DAN SPESIALIS FASILITAS KESEHATAN',
  //   'SURAT IZIN PRAKTIK (SIP) DOKTER DAN SPESIALIS MANDIRI',
  //   'SURAT IZIN PRAKTIK (SIPP) PERAWAT FASILITAS KESEHATAN',
  //   'SURAT IZIN PRAKTIK (SIPP) PERAWAT MANDIRI',
  //   'SURAT IZIN PRAKTIK AHLI TEKNOLOGI LABORATORIUM MEDIK (SIP-ATLM) FASILITAS KESEHATAN',
  //   'SURAT IZIN PRAKTIK AHLI TEKNOLOGI LABORATORIUM MEDIK (SIP-ATLM) MANDIRI',
  //   'SURAT IZIN PRAKTIK APOTEKER (SIPA) DI FASILITAS DISTRIBUSI PENYALURAN',
  //   'SURAT IZIN PRAKTIK APOTEKER (SIPA) KEDUA',
  //   'SURAT IZIN PRAKTIK APOTEKER (SIPA) KESATU',
  //   'SURAT IZIN PRAKTIK BIDAN (SiPB) FASILITAS KESEHATAN',
  //   'SURAT IZIN PRAKTIK BIDAN (SiIPB) MANDIRI',
  //   'SURAT IZIN PRAKTIK ELEKTOMEDIS (SIP-E)',
  //   'SURAT IZIN PRAKTIK FISIKAWAN MEDIK',
  //   'SURAT IZIN PRAKTIK FISIOTERAPI (SIPF)',
  //   'SURAT IZIN PRAKTIK OKUPASI TERAPIS (SIPOT)',
  //   'SURAT IZIN PRAKTIK ORTOTIS PROSTETIS (SIPOP)',
  //   'SURAT IZIN PRAKTIK PSIKOLOGIS KLINIS (SIPPK)',
  //   'SURAT IZIN PRAKTIK PENATA ANASTESI (SIPPA)',
  //   'SURAT IZIN PRAKTIK RADIOGRAFER (SIPR) FASILITAS KESEHATAN',
  //   'SURAT IZIN PRAKTIK RADIOGRAFER (SIPR) MANDIRI',
  //   'SURAT IZIN PRAKTIK REFRAKSIONIS OPTISIEN (RO)',
  //   'SURAT IZIN PRAKTIK TEKNIK KARDIOVASKULER (SIP-TKV)',
  //   'SURAT IZIN PRAKTIK TENAGA KESEHATAN TRADISIONAL (SIPTKT)',
  //   'SURAT IZIN PRAKTIK TENAGA TEKNIS KEFARMASIAN (SIPTTK) MANDIRI',
  //   'SURAT IZIN PRAKTIK TERAPIS GIGI DAN MULUT (SIPTGM)',
  //   'SURAT IZIN PRAKTIK TERAPIS WICARA (SIPTW)',
  //   'SURAT IZIN SPA (SOLUS PER AQUA)',
  //   'SURAT IZIN TOKO OBAT (SITO)',
  //   'SURAT IZIN USAHA PERDAGANGAN MINUMAN BERALKOHOL (SIUP-MB)',
  //   'SURAT IZIN VETERINER (SIVET)',
  //   'SURAT KETERANGAN PENELITIAN (SKP)',
  //   'SURAT TANDA PENDAFTARAN WARALABA (STPW)',
  //   'SURAT TERDAFTAR PENYEHAT TRADISIONAL (STPT)',
  //   'TANDA DAFTAR INDUSTRI (TDI)',
  //   'TANDA DAFTAR USAHA PARIWISATA (TDUP)',
  // ];

  const buttonTextStyle = {
    backgroundColor: color.primaryColor,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    width: '100%',
  };

  const [data, setData] = useState(dataLoad);
  const [id_user, setId] = useState('');
  // Data Step 1
  const [jenisIdentitas, setJenisIdentitas] = useState('');
  const [idPemohon, setIdPemohon] = useState('');
  const [namaPemohon, setNamaPemohon] = useState('');
  const [telpPemohon, setTelpPemohon] = useState('');
  const [alamatPemohon, setAlamatPemohon] = useState('');
  const [error1, setError1] = useState(false);

  // Data Step 2
  const [npwp, setNpwp] = useState('');
  const [nomorInduk, setNomorInduk] = useState('');
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [telpPerusahaan, setTelpPerusahaan] = useState('');
  const [alamatPerusahaan, setAlamatPerusahaan] = useState('');
  const [error2, setError2] = useState(false);

  // Data Step 3
  const [jenisIzin, setJenisIzin] = useState(route.params.izin);
  const [unitKerja, setUnitKerja] = useState('');
  const [error3, setError3] = useState(false);

  // Hide
  const [modal, setModal] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);
  const [modalIzin, setModalIzin] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const searchIzin = (text) => {
    if (text && text !== '') {
      let dataFiltered = data.filter((item) =>
        item.nama_izin.includes(text.toUpperCase()),
      );
      setData(dataFiltered);
    } else {
      setData(dataLoad);
    }
  };

  const onNextStep1 = () => {
    if (
      jenisIdentitas == '' ||
      idPemohon == '' ||
      namaPemohon == '' ||
      telpPemohon == '' ||
      alamatPemohon == ''
    ) {
      setError1(true);
      alert('Input tidak boleh kosong');
    } else {
      setError1(false);
    }
  };

  const onNextStep2 = () => {
    if (
      npwp == '' ||
      namaPerusahaan == '' ||
      alamatPerusahaan == '' ||
      telpPerusahaan == '' ||
      nomorInduk == ''
    ) {
      setError2(true);
      alert('Input Tidak Boleh Kosong');
    } else {
      setError2(false);
    }
  };

  const submitForm = () => {
    if (jenisIzin == '' || unitKerja == '') {
      setError3(true);
      alert('Input Tidak Boleh Kosong');
    } else {
      setError3(false);
      const data = {
        id_pemohon: idPemohon,
        jenis_identitas: jenisIdentitas,
        nama_pemohon: namaPemohon,
        telp_pemohon: telpPemohon,
        alamat_pemohon: alamatPemohon,
        nama_perusahaan: namaPerusahaan,
        npwp_perusahaan: npwp,
        nomor_induk_perusahaan: nomorInduk,
        telp_perusahaan: telpPerusahaan,
        alamat_perusahaan: alamatPerusahaan,
        jenis_izin: jenisIzin,
        unit_kerja: unitKerja,
        id_user: id_user,
      };
      // navigation.navigate('Notif');

      var timeout = true;
      const promise = new Promise((resolve, reject) => {
        const fetchTimeout = setTimeout(() => {
          fetch(`${Server}/dpmpstp/api/tambah_permohonan`, {
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
                timeout = false;
                navigation.navigate('Notif');
                ToastAndroid.show(
                  'Berhasil Tambah Permohonan',
                  ToastAndroid.LONG,
                );
              } else {
                alert(res.message);
              }
            })
            .catch((error) => {
              timeout = false;
              if (error) {
                alert(error);
              }
            });
        }, 5000);
        setTimeout(() => {
          console.log(timeout);
          if (timeout) {
            clearTimeout(fetchTimeout);
            reject('Jaringan Buruk');
          } else {
            resolve('Profil');
          }
        }, 10000);

      });
      promise.then((res) => console.log(res)).catch((res) => alert(res));
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowKeyboard(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false);
      },
    );

    AsyncStorage.getItem('id_user').then((res) => {
      setId(res);
    });

    // const loadUser = async () => {
    //   const id_user = await AsyncStorage.getItem('id_user');
    //   setId(id_user);
    // };

    const promise = new Promise((resolve, reject) => {
      const fetchTimeout = setTimeout(() => {
        fetch(`${Server}/dpmpstp/api/list_izin`)
          .then((res) => res.json())
          .then((res) => {
            let data = JSON.parse(res);
            timeout = false;
            // console.log(data)
            // setDataLoad(res);
            setData(data);
          })
          .catch((error) => {
            alert(error);
          });
      }, 5000);
      setTimeout(() => {
        if (timeout) {
          clearTimeout(fetchTimeout);
          reject('Jaringan Buruk');
        } else {
          resolve('Izin');
        }
      }, 10000);

    });

    promise.then((res) => console.log(res)).catch((res) => alert(res));
    // loadUser();
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Modal animationType="fade" visible={modal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onTouchEnd={() => setModal(false)}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '80%',
              borderRadius: 4,
              padding: 10,
            }}>
            {/* <Text>Pilih Jenis Identitas</Text> */}

            <TouchableOpacity
              onPress={() => setJenisIdentitas('KTP')}
              style={{
                borderBottomWidth: 1,
                padding: 8,
                borderColor: color.lightColor,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>KTP</Text>
                <Icons
                  name={
                    jenisIdentitas === 'KTP'
                      ? 'check-circle-outline'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setJenisIdentitas('SIM')}
              style={{
                // borderBottomWidth: 1,
                padding: 8,
                borderColor: color.secondaryColor,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>SIM</Text>
                <Icons
                  name={
                    jenisIdentitas === 'SIM'
                      ? 'check-circle-outline'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" visible={modalIzin} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              overflow: 'hidden',
              maxHeight: Dimensions.get('window').height - 30,
            }}>
            <Text>Pilih Jenis Izin</Text>

            <View style={{padding: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Cari Izin"
                  onChangeText={(value) => searchIzin(value)}
                  style={{
                    borderWidth: 1,
                    borderColor: '#b3b3b3',
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    width: '87%',
                  }}
                />
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: color.secondaryColor,
                      padding: 10,
                      maxHeight: Dimensions.get('window').height - 30,
                    }}
                    onPress={() => {
                      setJenisIzin(item.nama_izin), setModalIzin(false);
                    }}>
                    <Text>{item.nama_izin}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id_izin}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" visible={modalUnit} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onTouchEnd={() => setModalUnit(false)}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '80%',
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>Pilih Unit Kerja</Text>

            <TouchableOpacity
              onPress={() => setUnitKerja('Unit 1')}
              style={{
                borderBottomWidth: 1,
                padding: 8,
                borderColor: color.secondaryColor,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>Unit 1</Text>
                <Icons
                  name={
                    unitKerja === 'Unit 1'
                      ? 'check-circle-outline'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUnitKerja('Unit 2')}
              style={{
                borderBottomWidth: 1,
                padding: 8,
                borderColor: color.secondaryColor,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>Unit 2</Text>
                <Icons
                  name={
                    unitKerja === 'Unit 2'
                      ? 'check-circle-outline'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ProgressSteps
        topOffset={10}
        marginBottom={10}
        activeStepIconBorderColor={color.secondaryColor}
        completedProgressBarColor={color.secondaryColor}
        activeLabelColor={color.secondaryColor}
        completedProgressBarColor={color.secondaryColor}
        completedStepIconColor={color.secondaryColor}
        completedLabelColor={color.primaryColor}
        activeStepNumColor={color.secondaryColor}>
        <ProgressStep
          label="Data Pemohon"
          removeBtnRow={showKeyboard}
          onNext={onNextStep1}
          errors={error1}
          nextBtnTextStyle={buttonTextStyle}>
          <View style={styles.container}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text>Jenis Identitas </Text>
              <TouchableOpacity
                onPress={() => setModal(!modal)}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  borderColor: color.primaryColor,
                  padding: 10,
                }}>
                <Text>
                  {jenisIdentitas ? jenisIdentitas : 'Pilih Jenis Identitas'}
                </Text>
              </TouchableOpacity>
              <Text>ID Pemohon</Text>
              <TextInput
                onChangeText={(value) => setIdPemohon(value)}
                value={idPemohon}
                keyboardType="number-pad"
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Nama Pemohon</Text>
              <TextInput
                onChangeText={(value) => setNamaPemohon(value)}
                value={namaPemohon}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Telp Pemohon</Text>
              <TextInput
                onChangeText={(value) => setTelpPemohon(value)}
                value={telpPemohon}
                keyboardType="number-pad"
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Alamat Pemohon</Text>
              <TextInput
                onChangeText={(value) => setAlamatPemohon(value)}
                value={alamatPemohon}
                multiline
                numberOfLines={4}
                style={{
                  textAlignVertical: 'top',
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  borderColor: color.primaryColor,
                }}
              />
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Data Perusahaan"
          removeBtnRow={showKeyboard}
          onNext={onNextStep2}
          errors={error2}>
          <View style={styles.container}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text>NPWP Perusahaan</Text>
              <TextInput
                onChangeText={(value) => setNpwp(value)}
                value={npwp}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Nomor Induk Berusaha</Text>
              <TextInput
                onChangeText={(value) => setNomorInduk(value)}
                value={nomorInduk}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Nama Perusahaan</Text>
              <TextInput
                onChangeText={(value) => setNamaPerusahaan(value)}
                value={namaPerusahaan}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Telp Perusahaan</Text>
              <TextInput
                onChangeText={(value) => setTelpPerusahaan(value)}
                value={telpPerusahaan}
                keyboardType="number-pad"
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
              <Text>Alamat Perusahaan</Text>
              <TextInput
                onChangeText={(value) => setAlamatPerusahaan(value)}
                value={alamatPerusahaan}
                multiline
                numberOfLines={4}
                style={{
                  textAlignVertical: 'top',
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                }}
              />
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Data Perizinan"
          removeBtnRow={showKeyboard}
          onSubmit={submitForm}
          errors={error3}>
          <View style={styles.container}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text>Pilih Izin</Text>
              <TouchableOpacity
                onPress={() => setModalIzin(!modalIzin)}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  padding: 10,
                  borderColor: color.primaryColor,
                }}>
                <Text>{jenisIzin ? jenisIzin : 'Pilih Izin'}</Text>
              </TouchableOpacity>
              <Text>Pilih Unit Kerja</Text>
              <TouchableOpacity
                onPress={() => setModalUnit(!modalUnit)}
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 4,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: color.primaryColor,
                  padding: 10,
                }}>
                <Text>{unitKerja ? unitKerja : 'Pilih Unit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default Step;
