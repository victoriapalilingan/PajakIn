import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import IconSvg from '../IconSvg';

const NavItem = ({label, active, activeIcon, inactiveIcon, onPress}) => {
  const IconSource = active ? activeIcon : inactiveIcon;
  const labelColor = active ? '#FFFFFF' : 'rgba(255,255,255,0.9)';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.iconWrapper}>
        <IconSvg source={IconSource} size={38} />
      </View>
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  activeIcon: PropTypes.elementType.isRequired,
  inactiveIcon: PropTypes.elementType.isRequired,
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
