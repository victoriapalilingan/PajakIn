// src/components/molecules/BottomNavItem/index.js

import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

// HARUS TIGA TITIK (../../../) UNTUK MENGAKSES SRC/ASSETS
import HomeIcon from '../../../assets/Home.svg';
import HistoryIcon from '../../../assets/ActivityHistory1.svg';
import NotificationIcon from '../../../assets/Doorbell.svg';
import ProfileIcon from '../../../assets/Profile1.svg';

// Fungsi untuk memilih ikon
const Icon = ({type, isActive}) => {
  // Warna ikon: Hijau Tua Aktif, Abu-abu Inaktif
  const iconColor = isActive ? '#2A6E54' : '#ffffffff';
  const size = 24;

  let IconComponent;
  switch (type) {
    case 'home':
      IconComponent = HomeIcon;
      break;
    case 'history':
      IconComponent = HistoryIcon;
      break;
    case 'notification':
      IconComponent = NotificationIcon;
      break;
    case 'profile':
      IconComponent = ProfileIcon;
      break;
    default:
      return null;
  }

  return <IconComponent width={size} height={size} fill={iconColor} />;
};

// Komponen Utama BottomNavItem
const BottomNavItem = ({label, iconType, active, onPress}) => {
  const textColor = active ? '#3caa80ff' : '#ffffffff';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Icon type={iconType} isActive={active} />
      </View>
      <Text style={[styles.label, {color: textColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BottomNavItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    // Wajib ada agar ikon terlihat di atas bar hijau tua
    backgroundColor: '#226A5F',
  },
  iconWrapper: {
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    // fontFamily: 'Montserrat-Regular', // Pastikan font ini ada
  },
});
