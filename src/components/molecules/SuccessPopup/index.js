import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import Backdrop from '../../atoms/Backdrop';
import Button from '../../atoms/Button';
import CheckMark from '../../../assets/Check Mark.svg';

const SuccessPopup = ({visible, onClose, navigation}) => {
  if (!visible) return null;

  const handleNavigate = () => {
    onClose(); // tutup popup
    navigation.replace('SignIn'); // arahkan ke halaman SignIn
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Backdrop visible={visible} onPress={onClose} />

      <View style={styles.center}>
        <View style={styles.popupCard}>
          <View style={styles.iconWrapper}>
            <CheckMark width={112} height={100} />
          </View>

          <Text style={styles.title}>Akun Anda{'\n'}Berhasil Dibuat!</Text>

          <Button
            label="Masuk Sekarang"
            onPress={handleNavigate}
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
  iconWrapper: {
    marginBottom: 12,
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
