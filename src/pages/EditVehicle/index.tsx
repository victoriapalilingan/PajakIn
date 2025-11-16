import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Switch, Text, Alert} from 'react-native';
import CustomHeader from '../../components/molecules/CustomHeader';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/molecules/TextInput';
import Dropdown from '../../components/molecules/Dropdown';
import DatePicker from '../../components/molecules/DatePicker';
import MobilIcon from '../../assets/mobil.svg';
import MotorIcon from '../../assets/motor.svg';

function EditVehicle({navigation, route}) {
  const vehicleData = route?.params?.vehicleData;

  const [jenisKendaraan, setJenisKendaraan] = useState('');
  const [noPolisi, setNoPolisi] = useState('');
  const [merekTahun, setMerekTahun] = useState('');
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState(null);
  const [reminderActive, setReminderActive] = useState(true);

  useEffect(() => {
    if (vehicleData) {
      setJenisKendaraan(vehicleData.jenisKendaraan || '');
      setNoPolisi(vehicleData.noPolisi || '');
      setMerekTahun(vehicleData.merekTahun || '');

      if (vehicleData.tanggalJatuhTempo) {
        const date =
          vehicleData.tanggalJatuhTempo instanceof Date
            ? vehicleData.tanggalJatuhTempo
            : new Date(vehicleData.tanggalJatuhTempo);
        setTanggalJatuhTempo(date);
      }

      setReminderActive(
        vehicleData.reminderActive !== undefined
          ? vehicleData.reminderActive
          : true,
      );
    }
  }, [vehicleData]);

  const vehicleOptions = [
    {
      label: 'Mobil',
      value: 'mobil',
      icon: <MobilIcon width={24} height={24} />,
    },
    {
      label: 'Motor',
      value: 'motor',
      icon: <MotorIcon width={24} height={24} />,
    },
  ];

  const handleUpdate = () => {
    if (!jenisKendaraan) {
      Alert.alert('Perhatian', 'Pilih jenis kendaraan terlebih dahulu');
      return;
    }
    if (!noPolisi) {
      Alert.alert('Perhatian', 'Masukkan nomor polisi');
      return;
    }
    if (!merekTahun) {
      Alert.alert('Perhatian', 'Masukkan merek dan tahun kendaraan');
      return;
    }
    if (!tanggalJatuhTempo) {
      Alert.alert('Perhatian', 'Pilih tanggal jatuh tempo pajak');
      return;
    }

    const updatedData = {
      id: vehicleData?.id,
      jenisKendaraan,
      noPolisi,
      merekTahun,
      tanggalJatuhTempo,
      reminderActive,
    };

    console.log('Data Sebelum Update:', vehicleData);
    console.log('Data Setelah Update:', updatedData);

    Alert.alert('Berhasil', 'Data kendaraan berhasil diperbarui', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('VehicleDetail', {
            vehicleData: updatedData,
            updated: true,
          });
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus kendaraan ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            console.log('Deleted vehicle ID:', vehicleData?.id);

            Alert.alert('Berhasil', 'Kendaraan berhasil dihapus', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('VehicleList');
                },
              },
            ]);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Edit Kendaraan"
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

          {/* Merek & Tahun Kendaraan */}
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

          {/* Switch Pengingat */}
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

      {/* Buttons Fixed di Bawah */}
    </View>
  );
}

export default EditVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FFF4',
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
    borderTopColor: '#E0E0E0',
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
