import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ErrorIcon from '../../../assets/Error.svg';
import CheckedIcon from '../../../assets/CheckedCheckbox.svg';

export default function NotificationCard({title, subtitle, type}) {
  const Icon = type === 'warning' ? ErrorIcon : CheckedIcon;
  const titleColor = type === 'warning' ? '#F4C542' : '#F4C542';
  return (
    <View style={styles.card}>
           {' '}
      <View style={styles.iconWrap}>
                <Icon width={36} height={36} />     {' '}
      </View>
           {' '}
      <View style={styles.textWrap}>
                <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>     {' '}
      </View>
         {' '}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 318,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14, // KOREKSI: Jarak antar Card menjadi 24px
    marginBottom: 24, // KOREKSI: Drop shadow halus

    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    // Latar belakang ikon sudah dihapus
  },

  textWrap: {
    flex: 1,
    paddingRight: 5,
    // KOREKSI: Hapus padding vertikal untuk alignment sempurna // paddingTop: 4, // paddingBottom: 4,
  },

  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 2,
    lineHeight: 22,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    color: '#8A8A8A',
    lineHeight: 20,
  },
});
