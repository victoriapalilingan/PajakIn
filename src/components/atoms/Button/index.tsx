import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // import gradient

const Button = ({label, title, width = 255, height = 45, onPress}) => {
  const buttonLabel = label || title;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <LinearGradient
          colors={['#2A6E54', '#51D4A2']} // warna gradasi dari Figma
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.button, {width, height}]}>
          <Text style={styles.text}>{buttonLabel}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
