import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {InputField, TextBase, Gap} from '../../components';

const {width: screenWidth} = Dimensions.get('window');

const HEADER_COLOR = '#386641';
const BACKGROUND_COLOR = '#F5F9F1';
const TEXT_COLOR = '#386641';

export default function ProfileScreen() {
  const [profile, setProfile] = React.useState({
    namaLengkap: 'Nama Lengkap',
    nomorTelepon: 'Nomor Telepon',
    alamatEmail: 'Alamat Email',
    nik: '1234 5678 9012 3456',
    npwp: '09.876.543.2-101.987',
  });

  const handleChange = (field, value) => {
    setProfile(prev => ({...prev, [field]: value}));
  };

  // Fungsi saat tekan foto
  const handleSelectPhoto = () => {
    console.log('Select Profile Photo');
    // nanti sambungkan ke image picker
    // launchImageLibrary(...);
  };

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_COLOR} />
      <Gap height={24} />

      <View style={styles.headerContainer} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* FOTO PROFIL */}
        <TouchableOpacity
          style={styles.profileImageWrapper}
          onPress={handleSelectPhoto}
          activeOpacity={0.7}>
          <Image
            source={{uri: 'https://i.pravatar.cc/150?img=49'}}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={styles.formContent}>
          <TextBase style={styles.mainTitle} weight="Bold">
            Perbarui Profil
          </TextBase>

          <InputField
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            value={profile.namaLengkap}
            onChangeText={text => handleChange('namaLengkap', text)}
          />
          <InputField
            label="Nomor Telepon"
            placeholder="Nomor Telepon"
            value={profile.nomorTelepon}
            onChangeText={text => handleChange('nomorTelepon', text)}
          />
          <InputField
            label="Alamat Email"
            placeholder="Alamat Email"
            value={profile.alamatEmail}
            onChangeText={text => handleChange('alamatEmail', text)}
          />
          <InputField
            label="NIK"
            placeholder="NIK"
            isLocked={true}
            value={profile.nik}
          />
          <InputField
            label="NPWP"
            placeholder="NPWP"
            isLocked={true}
            value={profile.npwp}
          />
        </View>

        <View style={styles.scrollSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: screenWidth,
    height: 0,
    backgroundColor: HEADER_COLOR,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 25,
    zIndex: 1,
  },
  content: {
    paddingBottom: 100,
    alignItems: 'center',
    zIndex: 0,
  },
  profileImageWrapper: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 125,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
  },
  mainTitle: {
    fontSize: 22,
    color: TEXT_COLOR,
    marginTop: 15,
    marginBottom: 30,
  },
  formContent: {
    width: screenWidth * 0.9,
    alignItems: 'center',
  },
  scrollSpacer: {
    height: 50,
  },
});
