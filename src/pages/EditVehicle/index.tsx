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
  const {vehicle} = route?.params || {};

  const [vehicleType, setVehicleType] = useState(vehicle?.type || '');
  const [plateNumber, setPlateNumber] = useState(vehicle?.plateNumber || '');
  const [brandYear, setBrandYear] = useState(vehicle?.brandYear || '');
  const [dueDate, setDueDate] = useState(vehicle?.dueDate || '');
  const [reminder, setReminder] = useState(vehicle?.reminder || false);
  const [reminderH7, setReminderH7] = useState(vehicle?.reminderH7 || false);
  const [reminderH3, setReminderH3] = useState(vehicle?.reminderH3 || false);

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
      <CustomHeader
        title="Edit Kendaraan"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>
                {vehicleType || 'Pilih Jenis Kendaraan'}
              </Text>
              <DownButton width={24} height={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Polisi</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>
                {plateNumber || 'Masukkan Nomor Polisi'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Merek & Tahun Kendaraan</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.placeholder}>
                {brandYear || 'Masukkan Merek & Tahun Kendaraan'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Jatuh Tempo Pajak</Text>
            <TouchableOpacity style={styles.inputField}>
              <GoogleCalendarIcon
                width={20}
                height={20}
                style={{marginRight: 8}}
              />
              <Text style={styles.placeholder}>
                {dueDate || 'Masukkan Tanggal Jatuh Tempo Pajak'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Aktifkan Pengingat Pajak</Text>
            <Switch
              value={reminder}
              onValueChange={setReminder}
              trackColor={{false: '#C9C9C9', true: '#26634C'}}
              thumbColor="#FFF"
            />
          </View>

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
            textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 16}}
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
  scrollContent: {padding: 20, paddingBottom: 50},
  card: {marginTop: 16},
  inputGroup: {marginBottom: 16},
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 6,
  },
  inputField: {
    fontFamily: 'Montserrat-Regular',
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default EditVehicle;
