import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Pastikan file SVG ikon ini ada di path yang benar:
import ErrorIcon from '../../../assets/Error.svg';
import CheckedIcon from '../../../assets/CheckedCheckbox.svg';

const PRIMARY_YELLOW = '#E9A000'; // Kuning Emas
const SUBTITLE_COLOR = '#8A8A8A'; // Abu-abu

export default function NotificationCard({title, subtitle, type}) {
  const Icon = type === 'warning' ? ErrorIcon : CheckedIcon;

  const titleStyle = [styles.title, {color: PRIMARY_YELLOW}];

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Icon width={30} height={30} />
      </View>
      <View style={styles.textWrap}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
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
    paddingVertical: 14,
    marginBottom: 16,

    // Drop shadow halus
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  iconWrap: {
    marginRight: 16,
  },
  textWrap: {
    flex: 1,
    paddingRight: 5,
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
    color: SUBTITLE_COLOR,
    lineHeight: 20,
  },
});
