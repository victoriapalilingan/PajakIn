// components/atoms/DocumentCodeText.js
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const DocumentCodeText = ({children, style}) => {
  return <Text style={[styles.codeText, style]}>{children}</Text>;
};

export default DocumentCodeText;

const styles = StyleSheet.create({
  codeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#2A6E54',
    letterSpacing: 0.5,
  },
});
