import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({
  label,
  color = '#2A6E54', // warna hijau PajakIn
  textColor = '#FFFFFF',
  width = 255,
  height = 38,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color, width, height}]}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={[styles.text, {color: textColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // sesuai radius di Figma
    paddingHorizontal: 24, // kiri-kanan 24px
    paddingVertical: 8, // atas-bawah 10px
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3, // efek bayangan di Android
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    textAlign: 'center',
  },
});
