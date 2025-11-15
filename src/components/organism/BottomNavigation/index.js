import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import BottomNavItem from '../../molecules/BottomNavItem';
// HARUS TIGA TITIK (../../../)
import AddButton from '../../../assets/ButtonAdd1.svg';

const {width: screenWidth} = Dimensions.get('window');

const navItems = [
  {label: 'Home', iconType: 'home'},
  {label: 'Riwayat', iconType: 'history'},
  {label: 'Notifikasi', iconType: 'notification'},
  {label: 'Profil', iconType: 'profile'},
];

export default function BottomNavigation({
  activeScreen,
  onNavigate,
  onAddPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.slice(0, 2).map(item => (
          <BottomNavItem
            key={item.label}
            label={item.label}
            iconType={item.iconType}
            active={activeScreen === item.iconType}
            onPress={() => onNavigate(item.iconType)}
          />
        ))}

        <View style={styles.centerSpacer} />

        {navItems.slice(2, 4).map(item => (
          <BottomNavItem
            key={item.label}
            label={item.label}
            iconType={item.iconType}
            active={activeScreen === item.iconType}
            onPress={() => onNavigate(item.iconType)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <AddButton width={60} height={60} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: 70,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  navBar: {
    flexDirection: 'row',
    width: '100%',
    height: 60, // Lebih pendek dari container (70px) agar ada ruang putih di bawah
    backgroundColor: '#2A6E54',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  centerSpacer: {
    width: 60,
    height: 60,
  },
  addButton: {
    position: 'absolute',
    left: screenWidth / 2 - 30,
    top: -20,
    zIndex: 11,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
  },
});
