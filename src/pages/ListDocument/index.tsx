import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Text,
  Platform,
} from 'react-native';

import BottomNavigation from '../../components/organism/BottomNavigation';
import CustomHeader from '../../components/molecules/CustomHeader';
import BottomPopup from '../../components/molecules/BottomPopup';

// SESUAIKAN path ini dengan struktur project kamu
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';

import ButtonPlus from '../../assets/ButtonAdd1.svg';
import HomeIcon from '../../assets/White Home Page.svg';
import ReceiptIcon from '../../assets/ActivateHistory.svg';
import BellIcon from '../../assets/Doorbell.svg';
import UserIcon from '../../assets/Profile.svg';
import BtnCarIcon from '../../assets/WhiteMobil.svg';
import BtnDetailIcon from '../../assets/Pencil.svg';

const ListDocumentScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('riwayat');
  const [popupVisible, setPopupVisible] = useState(false);

  const documents = [
    {
      code: 'B 1234 XYZ',
      imageSource: require('../../assets/image1.png'),
    },
    {
      code: 'D 5678 ABC',
      imageSource: require('../../assets/image1.png'),
    },
  ];

  const navItems = [
    {key: 'home', label: 'Home', icon: HomeIcon},
    {key: 'riwayat', label: 'Dokumen', icon: ReceiptIcon},
    {key: 'notifikasi', label: 'Notifikasi', icon: BellIcon},
    {key: 'profil', label: 'Profil', icon: UserIcon},
  ];

  const handleTabPress = key => {
    console.log('tab:', key);
    setActiveTab(key);

    switch (key) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'riwayat':
        // sudah di halaman ini
        break;
      case 'notifikasi':
        navigation.navigate('Notifikasi');
        break;
      case 'profil':
        navigation.navigate('Profil');
        break;
    }
  };

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  const handleAddVehicle = () => {
    closePopup();
    navigation.navigate('AddVehicle'); // ganti sesuai nama route
  };

  const handleDetailVehicle = () => {
    closePopup();
    navigation.navigate('DetailVehicle'); // ganti sesuai nama route
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <CustomHeader title="List Dokumen" />

      {/* List Dokumen (hanya tampil) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {documents.map((doc, index) => (
            <View key={index} style={styles.cardWrapper}>
              <View style={styles.card}>
                <Image
                  source={doc.imageSource}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardInfo}>
                  <View style={styles.iconBox}>
                    <View style={styles.iconLine} />
                    <View style={styles.iconLine} />
                    <View style={styles.iconLine} />
                  </View>
                  <Text style={styles.codeText}>{doc.code}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={navItems}
        activeKey={activeTab}
        onTabPress={handleTabPress}
        onAddPress={openPopup}
        fabIcon={ButtonPlus}
        fabSize={63}
        fabLift={12}
      />

      {/* Bottom Popup */}
      <BottomPopup
        visible={popupVisible}
        onClose={closePopup}
        safeBottom={Platform.OS === 'ios' ? 20 : 0}>
        <Button
          label="Tambah Kendaraan"
          onPress={handleAddVehicle}
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
          onPress={handleDetailVehicle}
          color="#2A6E54"
          textColor="#FFFFFF"
          width={348}
          height={51}
          iconGap={10}
          leftIcon={<BtnDetailIcon width={24} height={24} color="#FFFFFF" />}
        />
      </BottomPopup>
    </SafeAreaView>
  );
};

export default ListDocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconLine: {
    width: 16,
    height: 2,
    backgroundColor: '#757575',
    marginVertical: 2,
    borderRadius: 1,
  },
  codeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#2A6E54',
    letterSpacing: 0.5,
  },
});
