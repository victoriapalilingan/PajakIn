import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

export default function Button({
  label,
  onPress,
  width = 255,
  height = 44,
  color = '#2A6E54',
  textColor = '#FFFFFF',
  fontSize = 22,
  disabled = false,
  leftIcon,
  iconSize = 24,
  iconGap = 12,
  horizontalPadding = 20,
}) {
  const radius = height / 2;

  const extraPadLeft = leftIcon ? iconSize + iconGap : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: disabled ? '#9BB8AC' : color,
          paddingHorizontal: horizontalPadding,
          paddingLeft: horizontalPadding + extraPadLeft,
        },
      ]}>
      {leftIcon ? (
        <View
          style={[
            styles.icon,
            {left: horizontalPadding, width: iconSize, height: iconSize},
          ]}>
          {leftIcon}
        </View>
      ) : null}

      <Text
        style={[styles.text, {color: textColor, fontSize}]}
        numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
