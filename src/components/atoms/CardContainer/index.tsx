// components/atoms/CardContainer.js
import React from 'react';
import {View, StyleSheet} from 'react-native';

const CardContainer = ({
  children,
  style,
  borderRadius = 16,
  backgroundColor = '#FFFFFF',
}) => {
  return (
    <View style={[styles.card, {borderRadius, backgroundColor}, style]}>
      {children}
    </View>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
