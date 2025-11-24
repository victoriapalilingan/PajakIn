import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  InputField,
  TextBase,
  Gap,
  Button,
  ConfirmationPopup,
} from '../../components';
import {NullPhoto} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import useProfile from '../../hooks/useProfile';

const {width: screenWidth} = Dimensions.get('window');

const HEADER_COLOR = '#386641';
const BACKGROUND_COLOR = '#F5F9F1';
const TEXT_COLOR = '#386641';

const ProfileScreen = ({navigation}) => {
  const [saving, setSaving] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const {
    profile,
    setProfile,
    photoBase64,
    setPhotoBase64,
    loading,
    saveProfile,
    logout,
  } = useProfile();

  const photoSource = photoBase64 ? {uri: photoBase64} : NullPhoto;

  const flash = (message, type) => {
    showMessage({message, type});
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({...prev, [field]: value}));
  };

  const handleSelectPhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
        quality: 0.7,
        includeBase64: true,
      });

      if (result.didCancel) {
        flash('Pemilihan foto dibatalkan', 'warning');
        return;
      }

      if (result.errorCode) {
        flash('Gagal memilih foto: ' + result.errorMessage, 'danger');
        return;
      }

      const asset = result.assets?.[0];
      if (!asset?.base64) {
        flash('Gagal memproses foto', 'danger');
        return;
      }

      const base64 = `data:${asset.type || 'image/jpeg'};base64,${
        asset.base64
      }`;
      setPhotoBase64(base64);
      flash('Foto berhasil dipilih', 'success');
    } catch (error) {
      console.log('Image picker error:', error);
      flash('Terjadi kesalahan saat memilih foto', 'danger');
    }
  };

  const handleSaveProfile = async () => {
    if (!profile.fullname.trim()) {
      Alert.alert('Perhatian', 'Nama lengkap tidak boleh kosong');
      return;
    }

    setSaving(true);
    try {
      await saveProfile(profile);
      flash('Profil berhasil disimpan!', 'success');
    } catch (error) {
      console.log('Save profile error:', error);
      Alert.alert('Error', error?.message || 'Gagal menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  const performLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setLogoutVisible(false);
      flash('Berhasil logout', 'success');
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Gagal logout. Silakan coba lagi.');
      setLogoutVisible(false);
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={HEADER_COLOR} />
        <TextBase style={styles.loadingText}>Memuat profil...</TextBase>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_COLOR} />
      <Gap height={24} />

      <View style={styles.headerContainer} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBorder}>
            <TouchableOpacity
              style={styles.profileImageWrapper}
              onPress={handleSelectPhoto}
              activeOpacity={0.7}>
              <Image source={photoSource} style={styles.profileImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleSelectPhoto}>
            <TextBase style={styles.changePhotoText}>Ubah Foto</TextBase>
          </TouchableOpacity>
        </View>

        <View style={styles.formContent}>
          <TextBase style={styles.mainTitle} weight="Bold">
            Perbarui Profil
          </TextBase>

          <InputField
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={profile.fullname}
            onChangeText={text => handleChange('fullname', text)}
          />
          <InputField
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            value={profile.phone}
            onChangeText={text => handleChange('phone', text)}
            keyboardType="phone-pad"
          />
          <InputField
            label="Alamat Email"
            placeholder="Masukkan alamat email"
            value={profile.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
            editable={false}
          />
          <InputField
            label="NIK"
            placeholder="Masukkan NIK"
            value={profile.nik}
            onChangeText={text => handleChange('nik', text)}
            keyboardType="numeric"
            maxLength={16}
          />
          <InputField
            label="NPWP"
            placeholder="Masukkan NPWP"
            value={profile.npwp}
            onChangeText={text => handleChange('npwp', text)}
          />

          <Gap height={24} />

          <Button
            label={saving ? 'Menyimpan...' : 'Simpan Profil'}
            onPress={handleSaveProfile}
            disabled={saving}
            width={screenWidth * 0.85}
            height={50}
            color="#2D6A4F"
            textColor="#FFFFFF"
          />

          <Gap height={16} />

          <Button
            label="Logout"
            onPress={() => setLogoutVisible(true)}
            width={screenWidth * 0.85}
            height={50}
            color="#D9534F"
            textColor="#FFFFFF"
          />
        </View>

        <View style={styles.scrollSpacer} />
      </ScrollView>

      <ConfirmationPopup
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari akun?"
        confirmLabel="Logout"
        cancelLabel="Batal"
        onConfirm={performLogout}
        onCancel={() => setLogoutVisible(false)}
        confirmButtonColor="#D9534F"
        cancelButtonColor="#9E9E9E"
        loading={loggingOut}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: TEXT_COLOR,
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
  profileContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  profileBorder: {
    width: 115,
    height: 115,
    borderRadius: 115 / 2,
    borderWidth: 2,
    borderColor: '#8D92A3',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoText: {
    marginTop: 10,
    fontSize: 13,
    color: TEXT_COLOR,
    textDecorationLine: 'underline',
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
