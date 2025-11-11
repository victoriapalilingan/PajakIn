import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

import GoogleCalendarIcon from '../../assets/googlecalendar.svg';
import DownButton from '../../assets/downbutton.svg';
import CustomHeader from '../../components/molecules/CustomHeader';
import Button from '../../components/atoms/Button';

const EditVehicle = ({route, navigation}) => {
  // Catatan: Logic state management (useState) tetap dipertahankan
  // agar data dapat ditampilkan, meskipun tampilan field-nya statis (Text).
  const {vehicle} = route?.params || {};

  const [vehicleType, setVehicleType] = useState(vehicle?.type || 'Mobil'); // Default: Mobil
  const [plateNumber, setPlateNumber] = useState(
    vehicle?.plateNumber || 'DB 3527 AP',
  );
  const [brandYear, setBrandYear] = useState(
    vehicle?.brandYear || 'Toyota Innova (2020)',
  );
  const [dueDate, setDueDate] = useState(vehicle?.dueDate || '2025 - 08 - 15');
  const [reminder, setReminder] = useState(vehicle?.reminder || true); // Default: true (Aktif)
  const [reminderH7, setReminderH7] = useState(vehicle?.reminderH7 || false);
  const [reminderH3, setReminderH3] = useState(vehicle?.reminderH3 || true); // Default: true (Aktif)

  const handleSave = () => {
    console.log('Update vehicle', {
      vehicleType,
      plateNumber,
      brandYear,
      dueDate,
      reminder,
      reminderH7,
      reminderH3,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header (Memanggil CustomHeader) */}
      <CustomHeader
        title="Edit Kendaraan"
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Jenis Kendaraan (DIPERBAIKI: Menggunakan style valueText) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.valueText}>{vehicleType}</Text>
              <DownButton width={24} height={24} />
            </TouchableOpacity>
          </View>

          {/* Nomor Polisi (DIPERBAIKI: Menggunakan style valueText) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Polisi</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.valueText}>{plateNumber}</Text>
            </TouchableOpacity>
          </View>

          {/* Merek & Tahun Kendaraan (DIPERBAIKI: Menggunakan style valueText) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Merek & Tahun Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.valueText}>{brandYear}</Text>
            </TouchableOpacity>
          </View>

          {/* Tanggal Jatuh Tempo Pajak (DIPERBAIKI: Menggunakan style valueText) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Jatuh Tempo Pajak</Text>
            <TouchableOpacity style={styles.inputField}>
              <GoogleCalendarIcon
                width={20}
                height={20}
                style={{marginRight: 8}}
              />
              <Text style={styles.valueText}>{dueDate}</Text>
            </TouchableOpacity>
          </View>

          {/* Pengingat */}
          <View style={styles.switchRow}>
            <Text style={styles.label}>Aktifkan Pengingat Pajak</Text>
            <Switch
              value={reminder}
              onValueChange={setReminder}
              trackColor={{false: '#C9C9C9', true: '#26634C'}}
              thumbColor="#FFF"
            />
          </View>

          {/* Waktu Pengingat */}
          <View style={styles.reminderSection}>
            <Text style={styles.reminderTitle}>Waktu Pengingat</Text>

            <View style={styles.checkboxRow}>
              <TouchableOpacity
                style={[styles.checkbox, reminderH7 && styles.checkboxActive]}
                onPress={() => setReminderH7(!reminderH7)}
              />
              <Text style={styles.checkboxLabel}>H - 7</Text>
            </View>

            <View style={styles.checkboxRow}>
              <TouchableOpacity
                style={[styles.checkbox, reminderH3 && styles.checkboxActive]}
                onPress={() => setReminderH3(!reminderH3)}
              />
              <Text style={styles.checkboxLabel}>H - 3</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Update"
            style={styles.saveButton}
            textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 22}}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4FFF4'},

  scrollView: {flex: 1},
  // DIPERBAIKI: Mengurangi padding atas agar field lebih dekat ke header (dari 40 ke 20)
  scrollContent: {padding: 30, paddingBottom: 10},

  card: {marginTop: 16},
  inputGroup: {marginBottom: 16},
  label: {
    fontFamily: 'Montserrat-medium',
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 6,
  },
  inputField: {
    fontFamily: 'Montserrat-medium',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 14,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15, // Shadow lebih kuat
    shadowRadius: 5,
    elevation: 5,
  },
  // DIPERBAIKI: Style baru untuk menampilkan nilai (value)
  valueText: {
    fontFamily: 'Montserrat-SemiBold', // Font semi-bold agar value menonjol
    fontSize: 16, // Sedikit lebih besar
    color: '#2D6A4F', // Warna teks gelap
    flex: 1,
  },

  // HAPUS placeholder lama (atau ubah agar valueText menggunakannya)
  placeholder: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  reminderSection: {marginTop: 12},
  reminderTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#2D6A4F',
    marginBottom: 10,
  },
  checkboxRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2D6A4F',
    marginRight: 10,
  },
  checkboxActive: {backgroundColor: '#2D6A4F'},
  checkboxLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#2F3F35',
  },
  // DIPERBAIKI: Hapus paddingHorizontal di buttonContainer karena sudah ada padding di scrollContent
  buttonContainer: {marginTop: 91, marginBottom: 30},
  saveButton: {
    // DIPERBAIKI: Sesuaikan width agar tidak terlalu lebar (mengikuti padding 20)
    width: '100%',
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default EditVehicle;
