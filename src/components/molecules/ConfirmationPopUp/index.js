import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {Backdrop, Button} from '../../atoms';

const ConfirmationPopup = ({
  visible,
  onClose,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  confirmLabel = 'Ya',
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
  confirmButtonWidth = 110,
  cancelButtonWidth = 110,
  buttonHeight = 44,
  confirmButtonColor = '#E53935',
  cancelButtonColor = '#9E9E9E',
  buttonFontSize = 16,
  loading = false,
}) => {
  if (!visible) return null;

  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    onClose && onClose();
    onCancel && onCancel();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleCancel}>
      <Backdrop visible={visible} onPress={loading ? null : handleCancel} />

      <View style={styles.center}>
        <View style={styles.popupCard}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          {message && <Text style={styles.message}>{message}</Text>}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              label={cancelLabel}
              onPress={handleCancel}
              width={cancelButtonWidth}
              height={buttonHeight}
              color={cancelButtonColor}
              textColor="#FFFFFF"
              fontSize={buttonFontSize}
              disabled={loading}
            />

            <View style={styles.buttonSpacer} />

            <Button
              label={loading ? 'Memproses...' : confirmLabel}
              onPress={handleConfirm}
              width={confirmButtonWidth}
              height={buttonHeight}
              color={confirmButtonColor}
              textColor="#FFFFFF"
              fontSize={buttonFontSize}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationPopup;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupCard: {
    width: 300,
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
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#2A6E53',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },
  message: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: 12,
  },
});
