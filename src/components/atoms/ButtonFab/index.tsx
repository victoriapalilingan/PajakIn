import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const ButtonFab = ({size = 63, onPress, icon}) => {
  const Icon = icon;

  // LOG: lihat ukuran yg diterima ButtonFab
  console.log('[ButtonFab] size=', size);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: size, height: size, borderRadius: size / 2},
      ]}
      onPress={onPress}
      activeOpacity={0.85}>
      <Svg width={size} height={size} style={styles.svgCircle}>
        <Defs>
          <LinearGradient id="fabGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#F4C542" />
            <Stop offset="1" stopColor="#FFE9B0" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 2) / 2}
          fill="url(#fabGradient)"
        />
      </Svg>

      {/* Ikon proporsional, ~48% dari diameter */}
      <Icon
        width={Math.round(size * 0.48)}
        height={Math.round(size * 0.48)}
        color="#2A6E54"
      />
    </TouchableOpacity>
  );
};

ButtonFab.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  icon: PropTypes.elementType.isRequired,
};

export default ButtonFab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {elevation: 10},
    }),
  },
  svgCircle: {position: 'absolute'},
});
