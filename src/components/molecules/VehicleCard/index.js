import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import ForwardIcon from '../../../assets/Forward.svg';

const BADGE_COLORS = {
  Aktif: {
    bg: '#2A6E54',
    text: '#FFFFFF',
  },
  'Akan Jatuh Tempo': {
    bg: '#F4C542',
    text: '#FFFFFF',
  },
  'Telat Bayar': {
    bg: '#F44336',
    text: '#FFFFFF',
  },
};

const VehicleCard = ({
  plate,
  icon,
  Icon,
  status,
  statusText,
  onPressForward,
}) => {
  const badgeColorSet = BADGE_COLORS[status] || BADGE_COLORS['Aktif'];

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {Icon ? (
          <Icon width={40} height={40} style={styles.vehicleIcon} />
        ) : (
          <Image
            source={icon}
            style={styles.vehicleIcon}
            resizeMode="contain"
          />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.plate}>{plate}</Text>

          {statusText && (
            <Text style={[styles.statusText, {color: badgeColorSet.bg}]}>
              {statusText}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={[styles.statusBadge, {backgroundColor: badgeColorSet.bg}]}>
          <Text style={[styles.statusBadgeText, {color: badgeColorSet.text}]}>
            Aktif
          </Text>
        </View>

        <TouchableOpacity
          style={styles.forwardButton}
          onPress={onPressForward}
          activeOpacity={0.7}>
          <ForwardIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  plate: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#1B4332',
  },
  statusText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  forwardButton: {
    marginLeft: 10,
    padding: 5,
  },
});
