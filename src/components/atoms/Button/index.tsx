// src/components/atoms/IconText.tsx
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React from 'react';

interface IconTextProps {
  icon: ImageSourcePropType;
  text: string;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
  iconWidth?: number;
  iconHeight?: number;
}

const IconText = ({
  icon,
  text,
  textStyle,
  iconStyle,
  iconWidth = 24,
  iconHeight = 24,
}: IconTextProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[styles.icon, {width: iconWidth, height: iconHeight}, iconStyle]}
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
    marginRight: 8,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});
