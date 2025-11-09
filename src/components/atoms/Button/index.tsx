import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  width?: number;
  height?: number;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  /** Ikon opsional, mis. <Ionicons name="add-circle" size={24} color="#fff" /> */
  leftIcon?: React.ReactNode; // <-- opsional
  iconSize?: number; // untuk perhitungan padding, default 24
  iconGap?: number; // jarak ikon ke teks, default 12
  horizontalPadding?: number; // padding kiri/kanan tombol, default 20
};

export default function Button({
  label,
  onPress,
  width = 255,
  height = 44,
  color = '#2A6E54',
  textColor = '#FFFFFF',
  disabled = false,
  leftIcon,
  iconSize = 24,
  iconGap = 12,
  horizontalPadding = 20,
}: Props) {
  const radius = height / 2;

  // Kalau ada ikon, tambahkan paddingLeft supaya teks tetap center secara visual
  const extraPadLeft = leftIcon ? iconSize + iconGap : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: disabled ? '#9BB8AC' : color,
          paddingHorizontal: horizontalPadding,
          // tambah padding kiri agar teks tetap center saat ada ikon
          paddingLeft: horizontalPadding + extraPadLeft,
        },
      ]}>
      {/* Ikon di kiri (absolute), hanya jika dikirim */}
      {leftIcon ? (
        <View
          style={[
            styles.icon,
            {left: horizontalPadding, width: iconSize, height: iconSize},
          ]}>
          {leftIcon}
        </View>
      ) : null}

      {/* Label selalu center */}
      <Text style={[styles.text, {color: textColor}]} numberOfLines={1}>
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
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
