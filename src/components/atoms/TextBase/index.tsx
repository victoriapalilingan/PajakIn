// src/components/atoms/TextBase.tsx
import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

// Definisikan tipe font family yang sering digunakan
type FontWeight = 'Bold' | 'Medium' | 'Regular' | 'Light';

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
}

const getFontFamily = (weight: FontWeight): string => {
  switch (weight) {
    case 'Bold':
      return 'Montserrat-Bold';
    case 'Medium':
      return 'Montserrat-Medium';
    case 'Regular':
      return 'Montserrat-Regular';
    case 'Light':
      return 'Montserrat-Light';
    default:
      return 'Montserrat-Regular';
  }
};

export const TextBase: React.FC<CustomTextProps> = ({
  children,
  weight = 'Regular',
  style,
  ...props
}) => {
  const fontFamilyStyle = {fontFamily: getFontFamily(weight)};

  return (
    <Text style={[styles.base, fontFamilyStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    // Warna teks default bisa didefinisikan di sini jika ada
    color: '#386641', // Menggunakan warna hijau tua dari desain
  },
});
