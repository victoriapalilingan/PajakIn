import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * Props:
 * - label / title    : teks tombol (label diprioritaskan)
 * - onPress          : handler tekan
 * - width            : default 255
 * - height           : default 45
 * - gradient         : true = gradasi (default), false = warna solid
 * - color            : warna solid (dipakai jika gradient=false)
 * - textColor        : warna teks
 * - style            : override style tombol
 * - textStyle        : override style teks
 */
export default function Button({
  label,
  title,
  onPress,
  width = 255,
  height = 45,
  gradient = true,
  color = '#2A6E54',
  textColor = '#FFFFFF',
  style,
  textStyle,
}) {
  const buttonLabel = label || title || '';
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{opacity: fade}}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.buttonBase, {width, height}, style]}>
        {gradient ? (
          <LinearGradient
            colors={['#2A6E54', '#51D4A2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[RNStyleSheet.absoluteFill, styles.round]}
          />
        ) : (
          <View
            style={[
              RNStyleSheet.absoluteFill,
              styles.round,
              {backgroundColor: color},
            ]}
          />
        )}

        <Text
          allowFontScaling={false}
          style={[styles.text, {color: textColor}, textStyle]}>
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  round: {borderRadius: 50},
  buttonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 24, // biar auto-fit teks
    // shadow iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // shadow Android
    elevation: 6,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15, // kecilkan jika masih kepanjangan
    textAlign: 'center',
    fontWeight: '700',
  },
});
