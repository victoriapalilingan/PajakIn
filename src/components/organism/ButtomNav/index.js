// src/components/organisms/BottomNav.js
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import colors from '../../styles/colors';

const BottomNav = () => {
  const navItems = [
    {id: 1, icon: require('../../assets/home.png'), label: 'Home'},
    {id: 2, icon: require('../../assets/history.png'), label: 'Riwayat'},
    {id: 3, icon: null, label: ''},
    {
      id: 4,
      icon: require('../../assets/notification.png'),
      label: 'Notifikasi',
    },
    {id: 5, icon: require('../../assets/profile.png'), label: 'Profil'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.map(item => (
          <TouchableOpacity key={item.id} style={styles.navItem}>
            {item.icon ? (
              <>
                <Image
                  source={item.icon}
                  style={styles.navIcon}
                  resizeMode="contain"
                />
                <Text style={styles.navLabel}>{item.label}</Text>
              </>
            ) : (
              <View style={styles.placeholder} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.floatingButton}>
        <Image
          source={require('../../assets/plus.png')}
          style={styles.plusIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  navBar: {
    backgroundColor: colors.primary,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  navLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: colors.white,
    marginTop: 4,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
  floatingButton: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
});
