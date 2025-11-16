// src/components/atoms/TextInputBase.tsx
import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  // Anda bisa menambahkan props custom jika diperlukan
}

export const TextInputBase: React.FC<CustomTextInputProps> = ({
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.base, style]}
      placeholderTextColor="#A0A0A0" // Placeholder Color diatur di sini
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium', // Font default untuk input
    color: '#386641',
    // Form Shadow bawaan untuk konsistensi
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
