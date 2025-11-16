import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const ButtonFab = ({size, onPress, icon}) => {
  const fabSize = size || 63;
  const Icon = icon;

  return (
    <TouchableOpacity
      style={[styles.container, {width: fabSize, height: fabSize}]}
      onPress={onPress}
      activeOpacity={0.85}>
      <Svg width={fabSize} height={fabSize} style={styles.svgCircle}>
        <Defs>
          <LinearGradient id="fabGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#F4C542" stopOpacity="1" />
            <Stop offset="1" stopColor="#FFE9B0" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={fabSize / 2}
          cy={fabSize / 2}
          r={(fabSize - 2) / 2}
          fill="url(#fabGradient)"
        />
      </Svg>
      <Icon width={30} height={30} color="#2A6E54" style={styles.icon} />
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
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  svgCircle: {
    position: 'absolute',
  },
  icon: {
    zIndex: 1,
  },
});
