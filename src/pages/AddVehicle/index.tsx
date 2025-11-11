import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

// Hapus import {useNavigation}
import GoogleCalendarIcon from '../../assets/googlecalendar.svg';
import DownButton from '../../assets/downbutton.svg';
import CustomHeader from '../../components/molecules/CustomHeader'; // Import header baru
import Button from '../../components/atoms/Button';

// UBAH: Menerima 'navigation' dari props (standar untuk screen React Navigation)
function AddVehicle({navigation}) {
  return (
    <View style={styles.container}>
      {/* Panggil CustomHeader */}
      <CustomHeader
        title="Tambah Kendaraan"
        // Panggil navigation.goBack() dari props yang diterima
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Jenis Kendaraan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>Pilih Jenis Kendaraan</Text>
              <DownButton width={26} height={26} />
            </TouchableOpacity>
          </View>

          {/* Nomor Polisi */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Polisi</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>Masukkan Nomor Polisi</Text>
            </TouchableOpacity>
          </View>

          {/* Merek & Tahun Kendaraan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Merek & Tahun Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>
                Masukkan Merek & Tahun Kendaraan
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tanggal Jatuh Tempo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Jatuh Tempo Pajak</Text>
            <TouchableOpacity style={styles.inputField}>
              <GoogleCalendarIcon
                width={20}
                height={20}
                style={{marginRight: 8}}
              />
              <Text style={styles.placeholder}>
                Masukkan Tanggal Jatuh Tempo Pajak
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pengingat */}
          <View style={styles.switchRow}>
            <Text style={styles.label}>Aktifkan Pengingat Pajak</Text>
            <Switch
              value={true}
              trackColor={{false: '#C9C9C9', true: '#26634C'}}
              thumbColor="#FFF"
            />
          </View>

          {/* Waktu Pengingat */}
          <View style={styles.reminderSection}>
            <Text style={styles.reminderTitle}>Waktu Pengingat</Text>

            <View style={styles.checkboxRow}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>H - 7</Text>
            </View>

            <View style={styles.checkboxRow}>
              <View style={[styles.checkbox, styles.checkboxActive]} />
              <Text style={styles.checkboxLabel}>H - 3</Text>
            </View>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            label="Simpan"
            style={styles.saveButton}
            textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 22}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4FFF4'},

  scrollView: {flex: 1},
  scrollContent: {padding: 30, paddingBottom: 10},
  card: {marginTop: 16},
  inputGroup: {marginBottom: 16},
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 6,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 14,
  },
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
  buttonContainer: {marginTop: 91, paddingHorizontal: 20, marginBottom: 30},
  saveButton: {
    width: 328,
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddVehicle;
