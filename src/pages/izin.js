import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {styles, color} from '../assets/style/style';
import {Server, convertToURLEncoded} from '../config/config';

// API QR Code
// https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=221

const Izin = ({navigation}) => {
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
  const [dataLoad, setDataLoad] = useState([]);

  const [search, setSearch] = useState('');
  const [dataList, setData] = useState([]);

  const searchIzin = () => {
    if (search) {
      let dataFiltered = dataList.filter(item =>
        item.nama_izin.includes(search.toUpperCase())
      );
      setData(dataFiltered);
    } else {
      setData(dataLoad);
    }
  };

  useEffect(() => {
    var timeout = true;
    var dataRes = [];

    const promise = new Promise((resolve, reject) => {
      const fetchTimeout = setTimeout(() => {
        fetch(`${Server}/dpmpstp/api/list_izin`)
          .then((res) => res.json())
          .then((res) => {
            let data = JSON.parse(res);
            // console.log(data)
            // setDataLoad(res);
            timeout = false;
            setData(data);
            dataRes = data;
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

    
    promise.then((res) =>{ console.log(res) 
      setData(dataRes)}).catch((res) => alert(res));
  }, []);

  return (
    <View
      style={
        (styles.container,
        {paddingBottom: 90, backgroundColor: '#fff', flex: 1})
      }>
      <StatusBar
        backgroundColor={color.primaryColor}
        animated
        showHideTransition="slide"
      />
      <View style={{padding: 10, backgroundColor: color.lightColor}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Cari Izin"
            onChangeText={(value) => setSearch(value)}
            onEndEditing={searchIzin}
            style={{
              borderWidth: 1,
              borderColor: color.primaryColor,
              borderRadius: 4,
              paddingHorizontal: 8,
              width: '100%',
            }}
          />
          <Icons
            name="search-outline"
            style={{
              position: 'absolute',
              right: 0,
              backgroundColor: color.primaryColor,
              padding: 14,
              color: '#fff',
              borderBottomRightRadius: 4,
              borderTopRightRadius: 4,
            }}
            size={20}
            onPress={searchIzin}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: color.lightColor,
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={{
                borderBottomWidth: 1,
                borderColor: color.secondaryColor,
                padding: 10,
              }}
              onPress={() =>
                navigation.navigate('Step', {izin: item.nama_izin})
              }>
              <Text>{item.nama_izin}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id_izin}
        />
      </View>
    </View>
  );
};
export default Izin;
