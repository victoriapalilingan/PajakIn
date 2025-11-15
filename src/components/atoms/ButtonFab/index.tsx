import React from 'react';
import {TouchableOpacity, View, StyleSheet, ViewStyle} from 'react-native';
// Hapus DimensionValue dari import di sini

// Definisikan Interface
interface ButtonFabProps {
  size?: number; // Misal 56
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyle;
}

export default function ButtonFab({
  size = 56,
  onPress,
  icon,
  style,
}: ButtonFabProps): JSX.Element {
  const radius = size / 2;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: radius,
        },
        style,
      ]}>
      <View style={styles.iconContainer}>{icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FEB800',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
  },
  iconContainer: {
    // Optional styling for the icon wrapper
  },
});
