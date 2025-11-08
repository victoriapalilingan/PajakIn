// src/components/organisms/HomeHeader.js
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBadge from '../molecules/StatusBadge';
import colors from '../../styles/colors';

const HomeHeader = () => {
  return (
    <LinearGradient
      colors={[colors.yellowLight, colors.greenLight]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.textSection}>
          <Text style={styles.greeting}>Halo,</Text>
          <Text style={styles.name}>Nama User</Text>
          <Text style={styles.subtitle}>
            Pantau status pajak kendaraanmu dengan mudah.
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/avatar.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.badgeSection}>
        <StatusBadge
          label="Aktif"
          count="12"
          backgroundColor={colors.primaryLight}
          textColor={colors.textPrimary}
        />
        <StatusBadge
          label="Akan Jatuh Tempo"
          count="3"
          backgroundColor={colors.yellowBadge}
          textColor={colors.textPrimary}
        />
        <StatusBadge
          label="Telat Bayar"
          count="1"
          backgroundColor={colors.redBadge}
          textColor={colors.textPrimary}
        />
      </View>
    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  textSection: {
    flex: 1,
    paddingRight: 12,
  },
  greeting: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: colors.textPrimary,
    marginTop: 2,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.textPrimary,
    opacity: 0.85,
    marginTop: 4,
    lineHeight: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badgeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
