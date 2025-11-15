import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import PropTypes from 'prop-types';

const Backdrop = ({visible, onPress}) => {
  if (!visible) return null;
  return <Pressable style={styles.backdrop} onPress={onPress} />;
};

Backdrop.propTypes = {
  visible: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Backdrop;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
});
