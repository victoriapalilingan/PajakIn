import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CustomHeader from '../../components/molecules/CustomHeader';
import CheckmarkIcon from '../../assets/checkmark.svg';

// TAMBAHKAN: Dummy Data untuk navigasi
const vehicleData = {
  id: 'DB3527AP',
  type: 'Mobil',
  plateNumber: 'DB 3527 AP',
  brandYear: 'Toyota Innova (2020)',
  dueDate: '2025 - 08 - 15',
  reminder: true,
  reminderH7: false,
  reminderH3: true,
};

const VehicleDetailScreen = ({navigation}) => {
  return (
    <View style={styles.fullScreenContainer}>
      <CustomHeader
        title="Detail Kendaraan"
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Nomor Polisi</Text>
            <Text style={styles.plateNumber}>DB 3527 AP</Text>
            <Text style={styles.vehicleInfo}>Mobil, Toyota Innova (2020)</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Status Pajak</Text>

            <View style={styles.statusContainer}>
              <View style={styles.statusBadge}>
                <CheckmarkIcon
                  width={55}
                  height={55}
                  style={styles.checkmarkIconStyle}
                />
                <Text style={styles.statusText}>Aktif</Text>
              </View>
            </View>

            <Text style={styles.dateLabel}>Tanggal Jatuh tempo Pajak</Text>
            <Text style={styles.dateValue}>2025 - 08 - 15</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          // TAMBAHKAN ONPRESS: Navigasi ke EditVehicleScreen
          onPress={() => {
            navigation?.navigate('EditVehicle', {
              vehicle: vehicleData, // Mengirim data ke halaman Edit
          onPress={() => {
            navigation.navigate('EditVehicle', {
              plateNumber: 'DB 3527 AP', // optional: kirim data ke halaman edit
            });
          }}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollViewContent: {
    flex: 1,
  },

  fixedButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    backgroundColor: '#E8F5E9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },

  content: {
    padding: 40,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: 18,
    color: '#2E5E4E',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
  },
  plateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#2E5E4E',
    fontFamily: 'Montserrat-SemiBold',
  },
  statusContainer: {
    marginVertical: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkmarkIconStyle: {
    marginRight: 10,
  },

  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFC107',
    fontFamily: 'Montserrat-SemiBold',
  },
  dateLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat-regular',
    color: '#2E5E4E',
    marginTop: 15,
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 16,
    color: '#2E5E4E',
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
  },

  editButton: {
    flex: 1,
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 100,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editButtonText: {
    color: '#ffffffff',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 15,
    borderRadius: 100,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});

export default VehicleDetailScreen;
