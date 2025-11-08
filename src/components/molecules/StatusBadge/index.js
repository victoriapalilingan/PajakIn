import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const StatusBadge = ({
  label,
  count,
  backgroundColor,
  textColor,
  labelFontSize = 12,
  countFontSize = 32,
}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text
        style={[
          styles.label,
          {
            color: textColor,
            fontSize: labelFontSize,
            marginBottom: 6, // tambahan jarak kecil antara label dan count
          },
        ]}
        numberOfLines={2}>
        {label}
      </Text>
      <Text
        style={[
          styles.count,
          {
            color: textColor,
            fontSize: countFontSize,
            lineHeight: countFontSize * 1.2,
          },
        ]}>
        {count}
      </Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  container: {
    width: 94,
    height: 88,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    lineHeight: 16,
  },
  count: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
});
