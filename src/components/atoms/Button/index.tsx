import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  // HAPUS TextStyle, karena tidak digunakan di kode Anda
  ViewStyle,
  DimensionValue, // Tipe ini digunakan di interface ButtonProps
} from 'react-native';

// 1. INTERFACE PROPS
interface ButtonProps {
  label: string;
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  color?: string;
  textColor?: string;
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  iconSize?: number;
  iconGap?: number;
  horizontalPadding?: number;
  style?: ViewStyle;
}

// 2. FUNGSI KOMPONEN
export default function Button({
  label,
  onPress,
  width = 255,
  height = 44,
  color = '#2A6E54',
  textColor = '#FFFFFF',
  fontSize = 22,
  disabled = false,
  leftIcon,
  iconSize = 24,
  iconGap = 12,
  horizontalPadding = 20,
  style,
}: ButtonProps): JSX.Element {
  const radius = Number(height) / 2;
  const extraPadLeft = leftIcon ? (iconSize || 0) + iconGap : 0;

  const buttonStyle: ViewStyle = {
    width,
    height,
    borderRadius: radius,
    backgroundColor: disabled ? '#9BB8AC' : color,
    paddingHorizontal: horizontalPadding,
    paddingLeft: horizontalPadding + extraPadLeft,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, buttonStyle, style]}>
      {leftIcon ? (
        <View
          style={[
            styles.icon,
            {left: horizontalPadding, width: iconSize, height: iconSize},
          ]}>
          {leftIcon}
        </View>
      ) : null}

      <Text
        style={[styles.text, {color: textColor, fontSize}]}
        numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
