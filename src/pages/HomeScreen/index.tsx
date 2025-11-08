// src/pages/HomeScreen/index.tsx
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

const HomeScreen = ({navigation}: any) => {
  const handleContinue = () => {
    console.log('Daftar Sekarang pressed');
    // Contoh navigasi ke halaman lain:
    // navigation.navigate('SignUp');
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
        <Gap height={16} />
        <View style={styles.buttonWrapper}>
          <Button
            label="Daftar Sekarang"
            onPress={handleContinue}
            color="#2A6E54"
            textColor="#FFFFFF"
            width={255}
            height={38}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
});
