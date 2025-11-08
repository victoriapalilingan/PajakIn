// src/components/atoms/IconText.js
import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const IconText = ({icon, text, textStyle, iconStyle}) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[styles.icon, iconStyle]}
        resizeMode="contain"
      />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default IconText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});
