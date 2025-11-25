import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

const Backdrop = ({visible, onPress}) => {
  if (!visible) return null;

  return <Pressable style={styles.backdrop} onPress={onPress} />;
};

export default Backdrop;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
});
