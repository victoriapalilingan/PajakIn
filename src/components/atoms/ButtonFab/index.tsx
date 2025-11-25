import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const ButtonFab = ({size = 63, onPress, icon: Icon}) => {
  const fabSize = size;

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

export default ButtonFab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  svgCircle: {
    position: 'absolute',
  },
  icon: {
    zIndex: 1,
  },
});
