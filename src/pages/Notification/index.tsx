import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

import NotificationCard from '../../components/molecules/NotificationCard';
import BottomNavigation from '../../components/organism/BottomNavigation';

// SESUAIKAN PATH INI DENGAN LOKASI FILE CustomHeader-MU
import CustomHeader from '../../components/molecules/CustomHeader';

import BottomPopup from '../../components/molecules/BottomPopup';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';

import ButtonPlus from '../../assets/ButtonAdd1.svg';
import HomeIcon from '../../assets/White Home Page.svg';
import ReceiptIcon from '../../assets/Activity History.svg';
import BellIcon from '../../assets/Active Doorbell.svg';
import UserIcon from '../../assets/Profile.svg';
import BtnCarIcon from '../../assets/WhiteMobil.svg';
import BtnDetailIcon from '../../assets/Pencil.svg';

const {width: screenWidth} = Dimensions.get('window');

// Tidak perlu interface dan typing di JS
const Card = NotificationCard;

// Tabs bottom navigation
const tabs = [
  {key: 'home', label: 'Home', icon: HomeIcon},
  {key: 'riwayat', label: 'Dokumen', icon: ReceiptIcon},
  {key: 'notifikasi', label: 'Notifikasi', icon: BellIcon},
  {key: 'profil', label: 'Profil', icon: UserIcon},
];

export default function Notification({navigation}) {
  // Hitung padding horizontal agar Card (lebar 318) terpusat
  const horizontalPadding = (screenWidth - 318) / 2;

  // tab yang sedang aktif
  const [activeTab, setActiveTab] = useState('notifikasi');

  // state untuk popup
  const [popupVisible, setPopupVisible] = useState(false);

  const handleTabPress = key => {
    setActiveTab(key);
    console.log('Navigating to', key);
    // kalau pakai React Navigation:
    // navigation.navigate(key);
  };

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  const handleAddVehicle = () => {
    console.log('Tambah Kendaraan');
  };

  const handleDetailVehicle = () => {
    console.log('Detail Kendaraan');
  };

  return (
    <View style={styles.fullScreenContainer}>
      {/* CUSTOM HEADER */}
      <CustomHeader title="Notifikasi" alignLeft />

      <Gap height={24} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingHorizontal: horizontalPadding},
        ]}>
        <Card
          type="warning"
          title="Pajak B 1234 XYZ jatuh tempo 3 hari lagi"
          subtitle="Reminder - 14 Okt 2025 - 08.30"
        />

        <Card
          type="success"
          title="Dokumen STNK untuk B 1234 XYZ berhasil diunggah"
          subtitle="Arsip - 13 Okt - 19.12"
        />

        <Card
          type="warning"
          title="Pajak D 5678 ABC sudah lewat 1 hari"
          subtitle="Reminder - 10 Okt 2025 - 07.50"
        />

        <View style={styles.scrollSpacer} />
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <BottomNavigation
        items={tabs}
        activeKey={activeTab}
        onTabPress={handleTabPress}
        onAddPress={openPopup}
        fabIcon={ButtonPlus}
      />

      {/* POPUP BOTTOM SHEET */}
      <BottomPopup
        visible={popupVisible}
        onClose={closePopup}
        safeBottom={Platform.OS === 'ios' ? 20 : 0}>
        <Button
          label="Tambah Kendaraan"
          onPress={() => {
            closePopup();
            handleAddVehicle();
          }}
          color="#F5C84C"
          textColor="#FFFFFF"
          width={348}
          height={51}
          iconGap={10}
          leftIcon={<BtnCarIcon width={24} height={24} color="#FFFFFF" />}
        />
        <Gap height={12} />
        <Button
          label="Detail Kendaraan"
          onPress={() => {
            closePopup();
            handleDetailVehicle();
          }}
          color="#2A6E54"
          textColor="#FFFFFF"
          width={348}
          height={51}
          iconGap={10}
          leftIcon={<BtnDetailIcon width={24} height={24} color="#FFFFFF" />}
        />
      </BottomPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F1FEF0',
  },
  content: {
    paddingTop: 24, // tidak perlu lagi 235 karena header sudah bukan absolute
    paddingBottom: 40,
    zIndex: 0,
  },
  scrollSpacer: {
    height: 100,
  },
});
