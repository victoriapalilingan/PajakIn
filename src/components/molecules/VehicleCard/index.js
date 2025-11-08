// src/components/molecules/VehicleCard.js
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

const VehicleCard = ({plate, icon, status, statusText, statusColor}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={icon} style={styles.vehicleIcon} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.plate}>{plate}</Text>
          {statusText && (
            <Text style={[styles.statusText, {color: statusColor}]}>
              {statusText}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.statusButton}>
        <Text style={styles.statusButtonText}>{status}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    height: 60,
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
  vehicleIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  plate: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  statusText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  statusButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.white,
  },
});
