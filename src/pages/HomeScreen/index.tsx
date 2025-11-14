import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Platform,
} from 'react-native';

import HomeHeader from '../../components/organism/HomeHeader';
import VehicleList from '../../components/organism/VehicleList';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import BottomNavigation from '../../components/organism/BottomNavigation';
import BottomPopup from '../../components/molecules/BottomPopup';

// SVG lokal
import PlusIcon from '../../assets/Add.svg';
import ButtonPlus from '../../assets/ButtonAdd1.svg';
import HomeIcon from '../../assets/Home.svg';
import ReceiptIcon from '../../assets/Activity History.svg';
import BellIcon from '../../assets/Doorbell.svg';
import UserIcon from '../../assets/Profile.svg';
import BtnCarIcon from '../../assets/WhiteMobil.svg';
import BtnDetailIcon from '../../assets/Pencil.svg';

const tabs = [
  {key: 'home', label: 'Home', icon: HomeIcon},
  {key: 'riwayat', label: 'Riwayat', icon: ReceiptIcon},
  {key: 'notifikasi', label: 'Notifikasi', icon: BellIcon},
  {key: 'profil', label: 'Profil', icon: UserIcon},
];

const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleAddVehicle = () => {
    console.log('Navigating to AddVehicle...');
    navigation.navigate('AddVehicle');
  };

  const handleDetailVehicle = () => {
    console.log('Navigating to DetailVehicle...');
    navigation.navigate('DetailVehicle');
  };

  const handleTabPress = key => {
    console.log('tab:', key);
    setActiveTab(key);
  };

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Gap height={25} />
        <HomeHeader />
        <Gap height={24} />
        <VehicleList />
        <Gap height={12} />
        <View style={styles.buttonWrapper}>
          <Button
            label="Tambah Kendaraan"
            onPress={handleAddVehicle}
            color="#2A6E54"
            textColor="#FFFFFF"
            width={368}
            height={51}
            iconGap={10}
            iconSize={28}
            leftIcon={<PlusIcon width={28} height={28} color="#FFFFFF" />}
          />
        </View>
        <Gap height={24} />
      </ScrollView>

      <BottomNavigation
        items={tabs}
        activeKey={activeTab}
        onTabPress={handleTabPress}
        onAddPress={openPopup}
        fabIcon={ButtonPlus}
        fabSize={63}
        fabLift={12}
      />

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
    </SafeAreaView>
  );
};

export default HomeScreen;

const NAV_HEIGHT_GUESS = 120;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  scrollView: {flex: 1},
  scrollContent: {paddingBottom: NAV_HEIGHT_GUESS},
  buttonWrapper: {alignItems: 'center'},
});
