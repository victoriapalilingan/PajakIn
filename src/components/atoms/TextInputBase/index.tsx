// src/components/atoms/TextInputBase.js
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export const TextInputBase = ({style, ...props}) => {
  return (
    <TextInput
      style={[styles.base, style]}
      placeholderTextColor="#A0A0A0"
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
    fontFamily: 'Montserrat-Medium',
    color: '#386641',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
