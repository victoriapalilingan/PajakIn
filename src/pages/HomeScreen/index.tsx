import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';

import {HomeHeader, VehicleList, Button, Gap} from '../../components';
import {PlusIcon} from '../../assets';
import {useHomeData} from '../../hooks/useHomeData';

const NAV_HEIGHT_GUESS = 40;

const HomeScreen = ({navigation}) => {
  const {userName, userPhoto, vehicleStats, loading, error} = useHomeData();

  const handleAddVehicle = () => {
    navigation.navigate('AddVehicle');
  };

  const handleDetailVehicle = vehicle => {
    if (vehicle && vehicle.id) {
      navigation.navigate('DetailVehicle', {vehicleId: vehicle.id});
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" color="#2A6E54" />
        <Text style={styles.loadingText}>Memuat data dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Gap height={10} />

        <HomeHeader
          userName={userName}
          userPhoto={userPhoto}
          vehicleStats={vehicleStats}
          errorMessage={error}
        />

        <Gap height={12} />

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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#2A6E54',
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
