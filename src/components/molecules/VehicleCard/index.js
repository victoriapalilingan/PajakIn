// src/components/molecules/VehicleCard.js
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import colors from '../../../styles/colors';
import ForwardIcon from '../../../assets/Forward.svg'; // pastikan file ada

const VehicleCard = ({
  plate,
  icon,
  Icon,
  status,
  statusText,
  statusColor,
  onPressForward, // ← fungsi untuk klik panah
}) => {
  return (
    <View style={styles.container}>
      {/* Bagian kiri: ikon kendaraan + plat */}
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
            <Text style={[styles.statusText, {color: statusColor}]}>
              {statusText}
            </Text>
          )}
        </View>
      </View>

      {/* Bagian kanan: badge + ikon panah (klik di sini) */}
      <View style={styles.rightSection}>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: statusColor || colors.primary},
          ]}>
          <Text style={styles.statusBadgeText}>{status}</Text>
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
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CDE5FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  plate: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  statusText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.white,
  },
  forwardButton: {
    marginLeft: 8,
    padding: 4, // area klik lebih luas
  },
});
