import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated, Easing, Pressable} from 'react-native';
import PropTypes from 'prop-types';

const BottomPopup = ({visible, onClose, children, safeBottom = 0}) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 300,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, fade]);

  return (
    <>
      {/* Backdrop */}
      {visible ? <Pressable style={styles.backdrop} onPress={onClose} /> : null}

      {/* Sheet */}
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[
          styles.sheet,
          {
            transform: [{translateY}],
            opacity: fade,
            paddingBottom: 16 + safeBottom,
          },
        ]}>
        <View style={styles.grabber} />
        {children}
      </Animated.View>
    </>
  );
};

BottomPopup.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  safeBottom: PropTypes.number,
};

export default BottomPopup;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  sheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 16,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginBottom: 8,
  },
});
