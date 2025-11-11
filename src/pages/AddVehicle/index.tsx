import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GoBackIcon from '../../assets/Go Back.svg';
import GoogleCalendarIcon from '../../assets/Google Calendar.svg';
import Button from '../../components/atoms/Button';
import DownButton from '../../assets/Down Button.svg';

const AddVehicle = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <GoBackIcon width={48} height={55} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Kendaraan</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Form Card */}
        <View style={styles.card}>
          {/* Jenis Kendaraan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>Pilih Jenis Kendaraan</Text>
              <DownButton width={30} height={30} />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FFF4',
  },
  header: {
    backgroundColor: '#26634C',
    paddingTop: 46,
    paddingBottom: 22,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  spacer: {
    width: 8,
  },

  rightSpacer: {
    flex: 1,
  },

  backButton: {
    width: 60,
    height: 60,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    fontWeight: '700',
    color: '#FEB800',
    textAlign: 'center',
  },
  scrollView: {flex: 1},
  scrollContent: {padding: 20, paddingBottom: 50},
  card: {marginTop: 16},
  inputGroup: {marginBottom: 16},
  label: {
    fontFamily: 'Montserrat-Medium', // ditambahkan
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 6,
  },
  inputField: {
    fontFamily: 'Montserrat-Regular', // ditambahkan
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  placeholder: {
    fontFamily: 'Montserrat-Regular', // ditambahkan
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
    fontFamily: 'Montserrat-Bold', // ditambahkan
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
  checkboxActive: {
    backgroundColor: '#2D6A4F',
  },
  checkboxLabel: {
    fontFamily: 'Montserrat-Regular', // ditambahkan
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default AddVehicle;
