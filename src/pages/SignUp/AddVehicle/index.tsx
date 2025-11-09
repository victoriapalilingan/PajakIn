import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Platform,
  Alert,
} from 'react-native';

interface AddVehicleProps {
  navigation?: any;
}

const AddVehicle: React.FC<AddVehicleProps> = ({navigation}) => {
  const [formData, setFormData] = useState({
    jenisKendaraan: '',
    nomorPolisi: '',
    merkTahun: '',
    tanggalJatuhTempo: '',
    aktifkanPengingat: false,
    h7: false,
    h3: false,
  });

  const [showJenisKendaraan, setShowJenisKendaraan] = useState(false);

  const jenisKendaraanOptions = [
    {label: 'Motor', value: 'motor'},
    {label: 'Mobil', value: 'mobil'},
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.jenisKendaraan ||
      !formData.nomorPolisi ||
      !formData.merkTahun ||
      !formData.tanggalJatuhTempo
    ) {
      Alert.alert('Error', 'Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    console.log('Data Kendaraan:', formData);
    Alert.alert('Sukses', 'Kendaraan berhasil ditambahkan!');

    if (navigation) {
      navigation.goBack();
    }
  };

  const ChevronBack = () => (
    <Text style={{fontSize: 24, color: '#0F766E', fontWeight: 'bold'}}>‹</Text>
  );

  const ChevronDown = () => (
    <Text style={{fontSize: 18, color: '#0D9488'}}>▼</Text>
  );

  const CheckmarkCircle = () => (
    <Text style={{fontSize: 20, color: '#14B8A6', fontWeight: 'bold'}}>✓</Text>
  );

  const Checkmark = () => (
    <Text style={{fontSize: 16, color: '#FFF', fontWeight: 'bold'}}>✓</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack()}>
          <ChevronBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Kendaraan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Jenis Kendaraan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kendaraan</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowJenisKendaraan(!showJenisKendaraan)}>
              <Text
                style={[
                  styles.dropdownText,
                  !formData.jenisKendaraan && styles.placeholderText,
                ]}>
                {formData.jenisKendaraan
                  ? jenisKendaraanOptions.find(
                      opt => opt.value === formData.jenisKendaraan,
                    )?.label
                  : 'Pilih jenis kendaraan'}
              </Text>
              <ChevronDown />
            </TouchableOpacity>

            {showJenisKendaraan && (
              <View style={styles.dropdownMenu}>
                {jenisKendaraanOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleInputChange('jenisKendaraan', option.value);
                      setShowJenisKendaraan(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{option.label}</Text>
                    {formData.jenisKendaraan === option.value && (
                      <CheckmarkCircle />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Nomor Polisi */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Polisi</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: B 1234 XYZ"
              placeholderTextColor="#94A3B8"
              value={formData.nomorPolisi}
              onChangeText={text => handleInputChange('nomorPolisi', text)}
              autoCapitalize="characters"
            />
          </View>

          {/* Merek & Tahun Kendaraan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Merek & Tahun Kendaraan</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Honda Beat 2020"
              placeholderTextColor="#94A3B8"
              value={formData.merkTahun}
              onChangeText={text => handleInputChange('merkTahun', text)}
            />
          </View>

          {/* Tanggal Jatuh Tempo Pajak */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Jatuh Tempo Pajak</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#94A3B8"
              value={formData.tanggalJatuhTempo}
              onChangeText={text =>
                handleInputChange('tanggalJatuhTempo', text)
              }
              keyboardType="numeric"
            />
            <Text style={styles.helperText}>
              Masukkan tanggal jatuh tempo pajak kendaraan
            </Text>
          </View>

          {/* Aktifkan Pengingat Pajak */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Aktifkan Pengingat Pajak</Text>
            <Switch
              trackColor={{false: '#CBD5E1', true: '#5EEAD4'}}
              thumbColor={formData.aktifkanPengingat ? '#14B8A6' : '#F1F5F9'}
              ios_backgroundColor="#CBD5E1"
              onValueChange={value =>
                handleInputChange('aktifkanPengingat', value)
              }
              value={formData.aktifkanPengingat}
            />
          </View>

          {/* Waktu Pengingat */}
          {formData.aktifkanPengingat && (
            <View style={styles.reminderSection}>
              <Text style={styles.label}>Waktu Pengingat</Text>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleInputChange('h7', !formData.h7)}>
                <View
                  style={[
                    styles.checkbox,
                    formData.h7 && styles.checkboxChecked,
                  ]}>
                  {formData.h7 && <Checkmark />}
                </View>
                <Text style={styles.checkboxLabel}>H - 7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleInputChange('h3', !formData.h3)}>
                <View
                  style={[
                    styles.checkbox,
                    formData.h3 && styles.checkboxChecked,
                  ]}>
                  {formData.h3 && <Checkmark />}
                </View>
                <Text style={styles.checkboxLabel}>H - 3</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Tombol Simpan */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#E0F2F1',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F766E',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0FDFA',
    borderWidth: 2,
    borderColor: '#CCFBF1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E293B',
  },
  dropdown: {
    backgroundColor: '#F0FDFA',
    borderWidth: 2,
    borderColor: '#CCFBF1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1E293B',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1E293B',
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  reminderSection: {
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCFBF1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#14B8A6',
    borderColor: '#14B8A6',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#334155',
  },
  submitButton: {
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#0F766E',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AddVehicle;
