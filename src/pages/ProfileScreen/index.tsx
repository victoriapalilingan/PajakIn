// src/pages/ProfileScreen/index.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';

// Import molekul (JSX) - Pastikan Anda punya index.d.ts untuk typing
import InputField from '../../components/molecules/InputField';
import BottomNavigation from '../../components/organism/BottomNavigation';
// Import atoms
import {TextBase} from '../../components/atoms/TextBase';

const {width: screenWidth} = Dimensions.get('window');

// --- KONSTANTA & STYLING WARNA ---
const HEADER_COLOR = '#386641';
const BACKGROUND_COLOR = '#F5F9F1';
const TEXT_COLOR = '#386641';
// Hapus HEADER_END_PADDING karena kita tidak menggunakannya lagi

// --- TYPING STATE ---
interface ProfileState {
  namaLengkap: string;
  nomorTelepon: string;
  alamatEmail: string;
  nik: string;
  npwp: string;
}

// --- FUNGSI UTAMA ---
export default function ProfileScreen(): JSX.Element {
  const [profile, setProfile] = React.useState<ProfileState>({
    namaLengkap: 'Nama Lengkap',
    nomorTelepon: 'Nomor Telepon',
    alamatEmail: 'Alamat Email',
    nik: '1234 5678 9012 3456',
    npwp: '09.876.543.2-101.987',
  });

  // Fungsi dengan tipe yang eksplisit untuk menghilangkan error 'any'
  const handleChange = (field: keyof ProfileState, value: string): void => {
    setProfile(prev => ({...prev, [field]: value}));
  };

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_COLOR} />

      {/* 1. Header Melengkung - Sudah di-fix tingginya */}
      <View style={styles.headerContainer} />

      {/* 2. ScrollView untuk Konten Profil */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        // Hapus contentContainerStyle yang berisi paddingTop yang bermasalah
        contentContainerStyle={styles.content}>
        {/* Foto Profil - Tambahkan margin negatif untuk menariknya ke atas */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={{uri: 'https://i.pravatar.cc/150?img=49'}}
            style={styles.profileImage}
          />
        </View>

        {/* Konten di dalam ScrollView */}
        <View style={styles.formContent}>
          {/* Judul: Menggunakan TextBase (contoh) */}
          <TextBase style={styles.mainTitle} weight="Bold">
            Perbarui Profil
          </TextBase>
          {/* InputFields yang di-edit */}
          <InputField
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            value={profile.namaLengkap}
            onChangeText={(text: string) => handleChange('namaLengkap', text)}
          />
          <InputField
            label="Nomor Telepon"
            placeholder="Nomor Telepon"
            value={profile.nomorTelepon}
            onChangeText={(text: string) => handleChange('nomorTelepon', text)}
          />
          <InputField
            label="Alamat Email"
            placeholder="Alamat Email"
            value={profile.alamatEmail}
            onChangeText={(text: string) => handleChange('alamatEmail', text)}
          />
          {/* Input NIK: isLocked=true tidak memerlukan onChangeText */}
          <InputField
            label="NIK"
            placeholder="NIK"
            isLocked={true}
            value={profile.nik}
          />
          {/* Input NPWP */}
          <InputField
            label="NPWP"
            placeholder="NPWP"
            isLocked={true}
            value={profile.npwp}
          />
        </View>
        <View style={styles.scrollSpacer} />
      </ScrollView>

      {/* 3. BOTTOM NAVIGATION BAR */}
      <BottomNavigation
        activeScreen="profil"
        onNavigate={(screen: string) => console.log('Navigating to', screen)}
        onAddPress={() => console.log('Add Button Pressed')}
      />
    </View>
  );
}

// --- PERBAIKAN STYLING ---
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: screenWidth,
    // PERBAIKAN 1: Tinggi diubah dari 180 menjadi 120 untuk mengurangi area hijau
    height: 0,
    backgroundColor: HEADER_COLOR,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 25,
    zIndex: 1,
  },
  content: {
    // PERBAIKAN 2: Hanya mempertahankan padding bawah agar tidak tertutup nav bar
    paddingBottom: 100,
    alignItems: 'center',
    zIndex: 0,
    // Hapus paddingTop di sini
  },
  profileImageWrapper: {
    // PERBAIKAN 3: Gunakan margin negatif untuk menarik foto ke atas
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
    // Anda mungkin perlu menambahkan fontFamily: 'Montserrat-Bold' jika belum terdaftar secara global
  },
  formContent: {
    width: screenWidth * 0.9, // Memberi sedikit ruang di tepi
    alignItems: 'center',
  },
  scrollSpacer: {
    height: 50,
  },
});
