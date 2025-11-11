import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import IconSvg from '../IconSvg';

const NavItem = ({label, icon, active, onPress}) => {
  const isActive = active || false;
  const iconColor = isActive ? '#FFC727' : '#FFFFFF';
  const labelColor = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.9)';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.iconWrapper}>
        <IconSvg source={icon} size={38} color={iconColor} />
      </View>
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};

export default NavItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 68,
    paddingVertical: 6,
  },
  iconWrapper: {
    marginBottom: 3,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
