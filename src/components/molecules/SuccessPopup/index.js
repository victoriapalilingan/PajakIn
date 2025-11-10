import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import Backdrop from '../../atoms/Backdrop';
import Button from '../../atoms/Button';
import CheckMark from '../../../assets/Check Mark.svg';

const SuccessPopup = ({visible, onClose}) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      {/* Backdrop reusable */}
      <Backdrop visible={visible} onPress={onClose} />

      {/* Card langsung di sini */}
      <View style={styles.center}>
        <View style={styles.popupCard}>
          {/* Icon centang */}
          <View style={styles.iconWrapper}>
            <CheckMark width={112} height={100} />
          </View>

          {/* Teks judul */}
          <Text style={styles.title}>Akun Anda{'\n'}Berhasil Dibuat!</Text>

          {/* Tombol reusable */}
          <Button
            label="Masuk Sekarang"
            onPress={onClose}
            width={200}
            height={44}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupCard: {
    width: 280,
    backgroundColor: '#D7FFCD',
    borderRadius: 40,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2A6E54',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#2A6E53',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
});
