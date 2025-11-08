// src/components/organism/HomeHeader/index.js
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBadge from '../../molecules/StatusBadge';
import colors from '../../../styles/colors';

const HomeHeader = () => {
  return (
    <View style={styles.wrapper}>
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
              source={require('../../../assets/Avatar.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>
      </LinearGradient>

      {/* Badge floating */}
      <View style={styles.badgeContainer}>
        <View style={styles.badgeItem}>
          <StatusBadge
            label="Aktif"
            count="12"
            backgroundColor={colors.badgeActive}
            textColor={colors.textPrimary}
          />
        </View>

        <View style={styles.badgeItem}>
          <StatusBadge
            label="Akan Jatuh Tempo"
            count="3"
            backgroundColor={colors.badgeWarning}
            textColor={colors.yellow2}
            labelFontSize={11}
            countFontSize={30}
          />
        </View>

        <StatusBadge
          label="Telat Bayar"
          count="1"
          backgroundColor={colors.badgeLate}
          textColor={colors.red2}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  // ruang ekstra di bawah untuk kartu putih yang “keluar” dari header
  wrapper: {
    width: '100%',
    paddingBottom: 36,
    backgroundColor: '#F5F5F5',
  },

  // header gradient
  container: {
    width: '100%',
    height: 230,
    paddingTop: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 68,
    borderBottomRightRadius: 68,
  },

  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textSection: {flex: 1, paddingRight: 12},

  greeting: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: colors.primary,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: colors.primary,
    marginTop: -2,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.textPrimary,
    opacity: 0.85,
    marginTop: 6,
    lineHeight: 16,
  },

  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
    elevation: 4,
  },
  avatar: {width: '100%', height: '100%'},

  // kartu putih melayang
  badgeContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: -10, // keluar dari header
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // soft shadow ala Figma (Y≈13, Blur≈28, Opacity≈10%)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 10,
  },

  // fallback gap 16 untuk RN yang belum support 'gap'
  badgeItem: {marginRight: 16},
});
