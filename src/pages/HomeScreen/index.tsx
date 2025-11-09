import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import HomeHeader from '../../components/organism/HomeHeader';
import VehicleList from '../../components/organism/VehicleList';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import BottomNavigation from '../../components/organism/BottomNavigation';

import PlusIcon from '../../assets/Add.svg';
import ButtonPlus from '../../assets/ButtonAdd1.svg';
import HomeIcon from '../../assets/Home.svg';
import ReceiptIcon from '../../assets/Activity History.svg';
import BellIcon from '../../assets/Doorbell.svg';
import UserIcon from '../../assets/Profile.svg';

const tabs = [
  {key: 'home', label: 'Home', icon: HomeIcon},
  {key: 'riwayat', label: 'Riwayat', icon: ReceiptIcon},
  {key: 'notifikasi', label: 'Notifikasi', icon: BellIcon},
  {key: 'profil', label: 'Profil', icon: UserIcon},
];

const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleAddVehicle = () => {
    console.log('Tambah Kendaraan');
    // navigation.navigate('AddVehicle');
  };

  const handleTabPress = key => {
    console.log('tab:', key);
    setActiveTab(key);
  };

  const handleAddPress = () => {
    console.log('add pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <Gap height={24} />
        <VehicleList />
        <Gap height={5} />
        <View style={styles.buttonWrapper}>
          <Button
            label="Tambah Kendaraan"
            onPress={handleAddVehicle}
            color="#2A6E54"
            textColor="#FFFFFF"
            width={368}
            height={51}
            iconGap={10}
            iconSize={36}
            leftIcon={<PlusIcon width={36} height={36} color="#FFFFFF" />}
          />
        </View>
        <Gap height={24} />
      </ScrollView>

      <BottomNavigation
        items={tabs}
        activeKey={activeTab}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
        fabIcon={ButtonPlus}
      />
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;

const NAV_HEIGHT_GUESS = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: NAV_HEIGHT_GUESS,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
});
