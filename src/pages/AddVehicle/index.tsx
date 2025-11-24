import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Switch, Text} from 'react-native';

import {
  CustomHeader,
  Button,
  TextInput,
  Dropdown,
  DatePicker,
  SuccessPopup,
} from '../../components';

import {MobilIcon, MotorIcon} from '../../assets';
import {useVehicles} from '../../hooks/useVehicles';
import {showMessage} from 'react-native-flash-message';

const vehicleOptions = [
  {label: 'Mobil', value: 'mobil', icon: <MobilIcon width={24} height={24} />},
  {label: 'Motor', value: 'motor', icon: <MotorIcon width={24} height={24} />},
];

const AddVehicle = ({navigation}) => {
  const [jenisKendaraan, setJenisKendaraan] = useState('');
  const [noPolisi, setNoPolisi] = useState('');
  const [merekTahun, setMerekTahun] = useState('');
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState(null);
  const [reminderActive, setReminderActive] = useState(true);

  const [saving, setSaving] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [savedVehicle, setSavedVehicle] = useState(null);

  const {addVehicle} = useVehicles();

  const showError = message => {
    showMessage({
      message,
      type: 'danger',
    });
  };

  const validateForm = () => {
    if (!jenisKendaraan) {
      showError('Pilih jenis kendaraan terlebih dahulu');
      return false;
    }
    if (!noPolisi) {
      showError('Masukkan nomor polisi');
      return false;
    }
    if (!merekTahun) {
      showError('Masukkan merek dan tahun kendaraan');
      return false;
    }
    if (!tanggalJatuhTempo) {
      showError('Pilih tanggal jatuh tempo pajak');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const vehicleData = {
      jenisKendaraan,
      noPolisi: noPolisi.trim().toUpperCase(),
      merekTahun: merekTahun.trim(),
      tanggalJatuhTempo: tanggalJatuhTempo.toISOString(),
      reminderActive,
    };

    setSaving(true);

    try {
      const vehicleId = await addVehicle(vehicleData);

      setSavedVehicle({
        id: vehicleId,
        ...vehicleData,
      });
      setSuccessVisible(true);
    } catch (error) {
      console.log('Error simpan kendaraan:', error);
      showError('Gagal menyimpan kendaraan, coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const handleGoToAddDocument = () => {
    setSuccessVisible(false);
    if (savedVehicle) {
      navigation.navigate('AddDocument', {vehicle: savedVehicle});
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Tambah Kendaraan"
        titleSize={19}
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
            label={saving ? 'Menyimpan...' : 'Simpan'}
            onPress={handleSave}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
            width={355}
            disabled={saving}
          />
        </View>
      </ScrollView>

      <SuccessPopup
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
        title="Kendaraan berhasil ditambahkan!"
        buttonLabel="Unggah Dokumen"
        onButtonPress={handleGoToAddDocument}
      />
    </View>
  );
};

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
    paddingVertical: 20,
    backgroundColor: '#F4FFF4',
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
});
