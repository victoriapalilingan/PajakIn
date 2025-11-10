import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput as RNInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const TextInput = ({
  label,
  placeholder,
  secureTextEntry,
  leftIconName,
  leftElement,
  hideRightIcon = false,
  hideLeftIcon = false,
  width = 255,
  height = 36,
  iconSize = 20, // 👈 tambahkan prop baru untuk kontrol ukuran ikon
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPassword = !!secureTextEntry;

  const hasLeftIcon = !hideLeftIcon && (leftElement || leftIconName);

  const s = useMemo(
    () => createStyles(width, height, hasLeftIcon),
    [width, height, hasLeftIcon],
  );

  return (
    <View style={[s.container, containerStyle]}>
      {label ? <Text style={s.label}>{label}</Text> : null}

      <View
        style={[
          s.field,
          focused && s.fieldFocused,
          s.shadowIOS,
          Platform.OS === 'android' && s.shadowAndroid,
        ]}>
        {hasLeftIcon ? (
          leftElement ? (
            <View style={s.iconWrapper}>{leftElement}</View>
          ) : (
            <View style={s.iconWrapper}>
              <Feather name={leftIconName} size={iconSize} color="#6A7C6E" />
              {/* 👆 pakai prop iconSize */}
            </View>
          )
        ) : null}

        <RNInput
          style={[s.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          secureTextEntry={isPassword && !show}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          underlineColorAndroid="transparent"
          {...rest}
        />

        {isPassword && !hideRightIcon && (
          <TouchableOpacity style={s.rightIcon} onPress={() => setShow(!show)}>
            <Feather
              name={show ? 'eye' : 'eye-off'}
              size={iconSize - 2} // 👈 kamu bisa bedakan sedikit ukuran kanan & kiri
              color="#9E9E9E"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;

const createStyles = (width, height, hasLeftIcon) =>
  StyleSheet.create({
    container: {
      width,
      marginBottom: 12,
      alignSelf: 'center',
    },
    label: {
      fontSize: 13,
      color: '#2A6E53',
      marginBottom: 6,
      fontFamily: 'Montserrat-Medium',
      textAlign: 'left',
      width: '100%',
    },
    field: {
      width,
      height,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      paddingLeft: hasLeftIcon ? 12 : 10,
      paddingRight: 12,
    },
    fieldFocused: {borderColor: '#1E90FF'},
    shadowIOS: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.15,
      shadowRadius: 5,
    },
    shadowAndroid: {elevation: 5},
    iconWrapper: {
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      height: '100%',
      fontSize: 14,
      color: '#020202',
      paddingVertical: 0,
      fontFamily: 'Montserrat-Regular',
    },
    rightIcon: {marginLeft: 8},
  });
