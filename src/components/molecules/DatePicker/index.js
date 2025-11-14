// src/components/molecules/DatePicker/index.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import GoogleCalendarIcon from '../../../assets/googlecalendar.svg';

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState({
    day: value ? new Date(value).getDate() : 1,
    month: value ? new Date(value).getMonth() : 0,
    year: value ? new Date(value).getFullYear() : new Date().getFullYear(),
  });

  const days = Array.from({length: 31}, (_, i) => i + 1);
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => currentYear + i);

  const formatDate = (dateValue?: Date) => {
    if (!dateValue) return '';
    const d = new Date(dateValue);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = () => {
    const selectedDate = new Date(tempDate.year, tempDate.month, tempDate.day);
    onChange(selectedDate);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}>
        <View style={styles.leftIcon}>
          <GoogleCalendarIcon width={20} height={20} />
        </View>
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={showPicker}
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <Text style={styles.modalTitle}>Pilih Tanggal</Text>

            <View style={styles.pickerRow}>
              {/* Day Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Tanggal</Text>
                <ScrollView
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}>
                  {days.map(day => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.pickerItem,
                        tempDate.day === day && styles.pickerItemSelected,
                      ]}
                      onPress={() => setTempDate({...tempDate, day})}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempDate.day === day && styles.pickerItemTextSelected,
                        ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Bulan</Text>
                <ScrollView
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.pickerItem,
                        tempDate.month === index && styles.pickerItemSelected,
                      ]}
                      onPress={() => setTempDate({...tempDate, month: index})}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempDate.month === index &&
                            styles.pickerItemTextSelected,
                        ]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Tahun</Text>
                <ScrollView
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}>
                  {years.map(year => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        tempDate.year === year && styles.pickerItemSelected,
                      ]}
                      onPress={() => setTempDate({...tempDate, year})}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempDate.year === year &&
                            styles.pickerItemTextSelected,
                        ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowPicker(false)}>
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Pilih</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#2A6E53',
    marginBottom: 6,
    fontFamily: 'Montserrat-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 12,
    height: 54,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  leftIcon: {
    marginRight: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    color: '#020202',
    fontFamily: 'Montserrat-Regular',
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#2A6E53',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#2A6E53',
    textAlign: 'center',
    marginBottom: 8,
  },
  pickerScroll: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
  },
  pickerItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  pickerItemSelected: {
    backgroundColor: '#E8F5E9',
  },
  pickerItemText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
  },
  pickerItemTextSelected: {
    fontFamily: 'Montserrat-Bold',
    color: '#2A6E53',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#2D6A4F',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#666',
  },
  confirmButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#FFFFFF',
  },
});
