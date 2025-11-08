// src/components/organisms/VehicleList.js
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import VehicleCard from '../../molecules/VehicleCard';
import colors from '../../../styles/colors';
import Gap from '../../atoms/Gap';

// ⬇️ Import SVG sebagai komponen (bukan require)
import MotorIcon from '../../../assets/motor.svg';
import MobilIcon from '../../../assets/mobil.svg';

const VehicleList = () => {
  const vehicles = [
    {
      id: 1,
      plate: 'Plat B 1234 XYZ',
      Icon: MotorIcon, // ⬅️ pakai komponen
      status: 'Aktif',
    },
    {
      id: 2,
      plate: 'Plat D 5678 ABC',
      Icon: MobilIcon, // ⬅️ pakai komponen
      status: 'Aktif',
      statusText: 'Akan Jatuh Tempo 7 Hari',
      statusColor: colors.orange,
    },
    {
      id: 3,
      plate: 'Plat DB 9123 VIC',
      Icon: MobilIcon, // ⬅️ pakai komponen
      status: 'Aktif',
      statusText: 'Telat Bayar 1 Hari',
      statusColor: colors.red,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kendaraan Anda</Text>
      <View style={styles.listContainer}>
        {vehicles.map((v, i) => (
          <React.Fragment key={v.id}>
            <VehicleCard
              plate={v.plate}
              Icon={v.Icon} // ⬅️ kirim sebagai komponen
              status={v.status}
              statusText={v.statusText}
              statusColor={v.statusColor}
            />
            {i !== vehicles.length - 1 && <Gap height={9} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20, paddingTop: 24},
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  listContainer: {marginBottom: 12},
});
