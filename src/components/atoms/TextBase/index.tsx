// src/components/atoms/TextBase.js
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const getFontFamily = weight => {
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

export const TextBase = ({children, weight = 'Regular', style, ...props}) => {
  const fontFamilyStyle = {fontFamily: getFontFamily(weight)};

  return (
    <Text style={[styles.base, fontFamilyStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#386641', // warna default
  },
});
