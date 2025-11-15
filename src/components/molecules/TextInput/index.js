// src/components/atoms/TextInput/index.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  leftElement?: React.ReactNode;
  error?: string;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  leftElement,
  error,
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, focused && styles.inputWrapperFocused]}>
        {leftElement && <View style={styles.leftIcon}>{leftElement}</View>}
        <RNTextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#2A6E53',
    marginBottom: 6,
    fontFamily: 'Montserrat-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 12,
    height: 54,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: '#2A6E53',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#020202',
    fontFamily: 'Montserrat-Regular',
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
    fontFamily: 'Montserrat-Regular',
  },
});