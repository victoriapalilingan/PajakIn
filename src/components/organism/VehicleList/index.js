// src/components/organisms/VehicleList.js
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import VehicleCard from '../molecules/VehicleCard';
import colors from '../../styles/colors';

const VehicleList = () => {
  const vehicles = [
    {
      id: 1,
      plate: 'Plat B 1234 XYZ',
      icon: require('../../assets/motor.png'),
      status: 'Aktif',
    },
    {
      id: 2,
      plate: 'Plat D 5678 ABC',
      icon: require('../../assets/mobil.png'),
      status: 'Aktif',
      statusText: 'Akan Jatuh Tempo 7 Hari',
      statusColor: colors.orange,
    },
    {
      id: 3,
      plate: 'Plat DB 9123 VIC',
      icon: require('../../assets/mobil.png'),
      status: 'Aktif',
      statusText: 'Telat Bayar 1 Hari',
      statusColor: colors.red,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kendaraan Anda</Text>
      <View style={styles.listContainer}>
        {vehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            plate={vehicle.plate}
            icon={vehicle.icon}
            status={vehicle.status}
            statusText={vehicle.statusText}
            statusColor={vehicle.statusColor}
          />
        ))}
      </View>
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  listContainer: {
    marginBottom: 12,
  },
});
