import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Switch, Text} from 'react-native';
import CustomHeader from '../../components/molecules/CustomHeader';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/molecules/TextInput';
import Dropdown from '../../components/molecules/Dropdown';
import DatePicker from '../../components/molecules/DatePicker';
import MobilIcon from '../../assets/mobil.svg';
import MotorIcon from '../../assets/motor.svg';

function AddVehicle({navigation}) {
  const [jenisKendaraan, setJenisKendaraan] = useState('');
  const [noPolisi, setNoPolisi] = useState('');
  const [merekTahun, setMerekTahun] = useState('');
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState<Date | undefined>(
    undefined,
  );
  const [reminderActive, setReminderActive] = useState(true);

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

  const handleSave = () => {
    if (!jenisKendaraan) {
      alert('Pilih jenis kendaraan terlebih dahulu');
      return;
    }
    if (!noPolisi) {
      alert('Masukkan nomor polisi');
      return;
    }
    if (!merekTahun) {
      alert('Masukkan merek dan tahun kendaraan');
      return;
    }
    if (!tanggalJatuhTempo) {
      alert('Pilih tanggal jatuh tempo pajak');
      return;
    }

    const vehicleData = {
      jenisKendaraan,
      noPolisi,
      merekTahun,
      tanggalJatuhTempo,
      reminderActive,
    };

    console.log('Data Kendaraan:', vehicleData);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Tambah Kendaraan"
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
          />
          <TextInput
            label="Merek & Tahun Kendaraan"
            placeholder="Masukkan Merek & Tahun Kendaraan"
            value={merekTahun}
            onChangeText={setMerekTahun}
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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          label="Simpan"
          onPress={handleSave}
          style={styles.saveButton}
          textStyle={styles.saveButtonText}
        />
      </View>
    </View>
  );
}

export default AddVehicle;

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
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#F4FFF4',
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 160,
  },
  saveButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
});
