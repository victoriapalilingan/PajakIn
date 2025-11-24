import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBadge from '../../molecules/StatusBadge';
import colors from '../../../styles/colors';

const HomeHeader = ({userName, userPhoto, vehicleStats}) => {
  const displayName = userName || 'Nama User';

  // Tentukan source foto
  const photoSource = userPhoto
    ? {uri: userPhoto}
    : require('../../../assets/null-photo.png');

  // Default stats jika tidak ada
  const stats = vehicleStats || {
    aktif: 0,
    akanJatuhTempo: 0,
    telatBayar: 0,
  };

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
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.subtitle}>
              Pantau status pajak kendaraanmu dengan mudah.
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            <Image
              source={photoSource}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>
      </LinearGradient>

      {/* Badge floating - Dynamic Stats */}
      <View style={styles.badgeContainer}>
        <View style={styles.badgeItem}>
          <StatusBadge
            label="Aktif"
            count={stats.aktif.toString()}
            backgroundColor={colors.badgeActive}
            textColor={colors.textPrimary}
          />
        </View>

        <View style={styles.badgeItem}>
          <StatusBadge
            label="Akan Jatuh Tempo"
            count={stats.akanJatuhTempo.toString()}
            backgroundColor={colors.badgeWarning}
            textColor={colors.yellow2}
            labelFontSize={11}
            countFontSize={30}
          />
        </View>

        <StatusBadge
          label="Telat Bayar"
          count={stats.telatBayar.toString()}
          backgroundColor={colors.badgeLate}
          textColor={colors.red2}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingBottom: 36,
    backgroundColor: '#F5F5F5',
  },
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
  textSection: {
    flex: 1,
    paddingRight: 12,
  },
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
    backgroundColor: '#F0F0F0',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: -10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 10,
  },
  badgeItem: {
    marginRight: 16,
  },
});
