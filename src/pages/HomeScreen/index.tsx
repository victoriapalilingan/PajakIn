// src/components/pages/HomeScreen.tsx
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

import PlusIcon from '../../assets/Add.svg';

const HomeScreen = ({navigation}: any) => {
  const handleAddVehicle = () => {
    // navigation.navigate('AddVehicle');
    console.log('Tambah Kendaraan');
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

        {/* tombol tepat setelah VehicleList */}
        <Gap height={5} />
        <View style={styles.buttonWrapper}>
          <Button
            label="Tambah Kendaraan"
            onPress={handleAddVehicle}
            color="#2A6E54"
            textColor="#FFFFFF"
            width={380}
            height={51}
            iconGap={10} // jarak 10
            iconSize={36} // sesuaikan dgn ukuran ikon
            leftIcon={<PlusIcon width={36} height={36} fill="#FFFFFF" />}
          />
        </View>

        {/* beri ruang ekstra agar tidak tertutup bottom tab / nav */}
        <Gap height={24} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  scrollView: {flex: 1},
  // paddingBottom kecil saja karena tombol ada di dalam ScrollView, bukan absolute
  scrollContent: {paddingBottom: 16},
  buttonWrapper: {alignItems: 'center'},
});
