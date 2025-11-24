import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {InputField, TextBase, Gap, Button} from '../../components';
import {NullPhoto} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import {getAuth, signOut} from 'firebase/auth';
import {getDatabase, ref, onValue, update, push, set} from 'firebase/database';

const {width: screenWidth} = Dimensions.get('window');

const HEADER_COLOR = '#386641';
const BACKGROUND_COLOR = '#F5F9F1';
const TEXT_COLOR = '#386641';

export default function ProfileScreen({navigation}) {
  const [photo, setPhoto] = useState(NullPhoto);
  const [photoBase64, setPhotoBase64] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    fullname: '',
    phone: '',
    email: '',
    nik: '',
    npwp: '',
  });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${currentUser.uid}`);

    const unsubscribe = onValue(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          setProfile({
            fullname: data.fullname || '',
            phone: data.phone || '',
            email: data.email || currentUser.email || '',
            nik: data.nik || '',
            npwp: data.npwp || '',
          });

          if (data.photo) {
            setPhotoBase64(data.photo);
            setPhoto({uri: data.photo});
          }
        }
        setLoading(false);
      },
      error => {
        console.log('Error fetching user:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

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
        showMessage({
          message: 'Pemilihan foto dibatalkan',
          type: 'warning',
        });
        return;
      }

      if (result.errorCode) {
        showMessage({
          message: 'Gagal memilih foto: ' + result.errorMessage,
          type: 'danger',
        });
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const base64 = `data:${asset.type || 'image/jpeg'};base64,${
          asset.base64
        }`;

        setPhotoBase64(base64);
        setPhoto({uri: base64});

        showMessage({
          message: 'Foto berhasil dipilih',
          type: 'success',
        });
      }
    } catch (error) {
      console.log('Image picker error:', error);
      showMessage({
        message: 'Terjadi kesalahan saat memilih foto',
        type: 'danger',
      });
    }
  };

  const handleSaveProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return;
    }

    if (!profile.fullname.trim()) {
      Alert.alert('Perhatian', 'Nama lengkap tidak boleh kosong');
      return;
    }

    setSaving(true);

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);

      const now = new Date();
      const timestamp = now.getTime();

      await update(userRef, {
        fullname: profile.fullname.trim(),
        phone: profile.phone.trim(),
        email: profile.email.trim(),
        nik: profile.nik.trim(),
        npwp: profile.npwp.trim(),
        photo: photoBase64,
        updatedAt: now.toISOString(),
      });

      const notifRef = push(ref(db, `notifications/${currentUser.uid}`));
      await set(notifRef, {
        id: notifRef.key,
        type: 'success',
        title: 'Profil berhasil diperbarui',
        subtitle: `Update profil • ${now.toLocaleString('id-ID')}`,
        timestamp,
        category: 'profile-update',
        read: false,
      });

      showMessage({
        message: 'Profil berhasil disimpan!',
        type: 'success',
      });
    } catch (error) {
      console.log('Save profile error:', error);
      Alert.alert('Error', 'Gagal menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  const performLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      showMessage({
        message: 'Berhasil logout',
        type: 'success',
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Gagal logout. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar dari akun?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: performLogout,
        },
      ],
      {cancelable: true},
    );
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
              <Image source={photo} style={styles.profileImage} />
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
            onPress={handleLogout}
            width={screenWidth * 0.85}
            height={50}
            color="#D9534F"
            textColor="#FFFFFF"
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
