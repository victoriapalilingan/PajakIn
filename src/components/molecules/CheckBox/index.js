import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const CheckBox = ({label, checked, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#2A6E54',
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#2A6E54',
    borderColor: '#2A6E54',
  },
  checkmark: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  label: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: '#2A6E54',
    lineHeight: 10, // hampir auto, supaya tetap rapi
    letterSpacing: 0,
  },
});
