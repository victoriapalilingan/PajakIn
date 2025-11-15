import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

// Definisikan Interface
interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  active: boolean; // Status apakah item ini aktif
  onPress: () => void;
}

export default function NavItem({
  label,
  icon,
  active,
  onPress,
}: NavItemProps): JSX.Element {
  const textColor = active ? '#2A6E54' : '#8D8D8D'; // Warna teks dinamis

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={[styles.label, {color: textColor}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular', // Pastikan font ini ada
  },
});
