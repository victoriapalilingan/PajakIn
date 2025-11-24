import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  CustomHeader,
  Button,
  TextInput,
  Dropdown,
  DatePicker,
} from '../../components';

import {MobilIcon, MotorIcon} from '../../assets';

// Custom hooks
import {useVehicle} from '../../hooks/useVehicles';

// Utils
import {parseDate} from '../../utils/Date/';

const vehicleOptions = [
  {label: 'Mobil', value: 'mobil', icon: <MobilIcon width={24} height={24} />},
  {label: 'Motor', value: 'motor', icon: <MotorIcon width={24} height={24} />},
];

const EditVehicle = ({navigation, route}) => {
  const vehicleId = route?.params?.vehicleId;

  const [jenisKendaraan, setJenisKendaraan] = useState('');
  const [noPolisi, setNoPolisi] = useState('');
  const [merekTahun, setMerekTahun] = useState('');
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState(null);
  const [reminderActive, setReminderActive] = useState(true);

  // Use custom hook for single vehicle
  const {vehicle, loading, error, updateVehicleData} = useVehicle(vehicleId);

  // Populate form when vehicle data is loaded
  useEffect(() => {
    if (vehicle) {
      setJenisKendaraan(vehicle.jenisKendaraan || '');
      setNoPolisi(vehicle.noPolisi || '');
      setMerekTahun(vehicle.merekTahun || '');
      setTanggalJatuhTempo(parseDate(vehicle.tanggalJatuhTempo));
      setReminderActive(
        vehicle.reminderActive !== undefined ? vehicle.reminderActive : true,
      );
    }
  }, [vehicle]);

  // Handle error
  useEffect(() => {
    if (error) {
      Alert.alert('Error', 'Data kendaraan tidak ditemukan', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    }
  }, [error, navigation]);

  const handleUpdate = async () => {
    // Validation
    if (!jenisKendaraan) {
      return Alert.alert('Perhatian', 'Pilih jenis kendaraan');
    }
    if (!noPolisi) {
      return Alert.alert('Perhatian', 'Masukkan nomor polisi');
    }
    if (!merekTahun) {
      return Alert.alert('Perhatian', 'Masukkan merek & tahun kendaraan');
    }
    if (!tanggalJatuhTempo) {
      return Alert.alert('Perhatian', 'Pilih tanggal jatuh tempo pajak');
    }

    const updatedData = {
      jenisKendaraan,
      noPolisi,
      merekTahun,
      tanggalJatuhTempo: tanggalJatuhTempo.toISOString(),
      reminderActive,
    };

    try {
      await updateVehicleData(updatedData);

      Alert.alert('Berhasil', 'Data kendaraan berhasil diperbarui', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      Alert.alert('Gagal', 'Gagal memperbarui kendaraan, coba lagi.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D6A4F" />
        <Text style={styles.loadingText}>Memuat data kendaraan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Edit Kendaraan"
        titleSize={24}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Dropdown
            label="Jenis Kendaraan"
            placeholder="Pilih Jenis Kendaraan"
            options={vehicleOptions}
            value={jenisKendaraan}
            onSelect={setJenisKendaraan}
          />

          <TextInput
            label="Nomor Polisi"
            placeholder="Masukkan Nomor Polisi"
            value={noPolisi}
            onChangeText={setNoPolisi}
            autoCapitalize="characters"
            width={355}
            height={54}
          />

          <TextInput
            label="Merek & Tahun Kendaraan"
            placeholder="Masukkan Merek & Tahun Kendaraan"
            value={merekTahun}
            onChangeText={setMerekTahun}
            width={355}
            height={54}
          />

          <DatePicker
            label="Tanggal Jatuh Tempo Pajak"
            placeholder="Masukkan Tanggal Jatuh Tempo Pajak"
            value={tanggalJatuhTempo}
            onChange={setTanggalJatuhTempo}
          />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Aktifkan Pengingat Pajak</Text>
            <Switch
              value={reminderActive}
              onValueChange={setReminderActive}
              trackColor={{false: '#C9C9C9', true: '#26634C'}}
              thumbColor="#FFF"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Simpan Perubahan"
            onPress={handleUpdate}
            style={styles.updateButton}
            textStyle={styles.updateButtonText}
            width={355}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FFF4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4FFF4',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#2A6E53',
    fontFamily: 'Montserrat-Medium',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 30,
    paddingBottom: 20,
  },
  card: {
    marginTop: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 13,
    color: '#2A6E53',
    fontFamily: 'Montserrat-Medium',
  },
  buttonContainer: {
    paddingVertical: 20,
    backgroundColor: '#F4FFF4',
    marginTop: 10,
  },
  updateButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
});
