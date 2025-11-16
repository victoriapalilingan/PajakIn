import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextBase} from '../../atoms/TextBase';
import {TextInputBase} from '../../atoms/TextInputBase';
import SecureIcon from '../../../assets/Secure.svg';

export default function InputField({
  label,
  placeholder,
  isLocked = false,
  value = '',
  onChangeText,
}) {
  return (
    <View style={styles.inputGroup}>
      <TextBase style={styles.inputLabel} weight="Regular">
        {label}
      </TextBase>
      <View style={styles.inputWrapper}>
        <TextInputBase
          style={[styles.textInput, isLocked && styles.lockedInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!isLocked}
        />
        {isLocked && (
          <View style={styles.lockIcon}>
            <SecureIcon width={20} height={20} fill="#A0A0A0" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#386641',
    fontFamily: 'Montserrat-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
  },
  lockedInput: {
    backgroundColor: '#F0F0F0',
    color: '#A0A0A0',
  },
  lockIcon: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
});
