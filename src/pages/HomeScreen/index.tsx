import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import HomeHeader from '../../components/organism/HomeHeader';
import VehicleList from '../../components/organism/VehicleList';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';

// SVG lokal
import PlusIcon from '../../assets/Add.svg';

const HomeScreen = ({navigation}) => {
  const handleAddVehicle = () => {
    console.log('Navigating to AddVehicle...');
    navigation.navigate('AddVehicle');
  };

  const handleDetailVehicle = () => {
    console.log('Navigating to DetailVehicle...');
    navigation.navigate('DetailVehicle');
  };

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
        <Gap height={0} />
        <HomeHeader />
        <Gap height={24} />
        <VehicleList onPressDetail={handleDetailVehicle} />
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
    </SafeAreaView>
  );
};

export default HomeScreen;

const NAV_HEIGHT_GUESS = 40; // cukup sedikit padding bawah

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  scrollView: {flex: 1},
  scrollContent: {paddingBottom: NAV_HEIGHT_GUESS},
  buttonWrapper: {alignItems: 'center'},
});
