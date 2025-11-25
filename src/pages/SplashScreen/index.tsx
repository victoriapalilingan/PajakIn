import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  const translateYAnim = useRef(new Animated.Value(height * 0.3)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -20,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.0,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      setTimeout(() => {
        if (user) {
          console.log('✔ User terdeteksi, langsung ke Main');
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
        } else {
          console.log('❌ Tidak ada user, ke OnBoarding');
          navigation.reset({
            index: 0,
            routes: [{name: 'OnBoarding'}],
          });
        }
      }, 3000);
    });

    return () => unsubscribe();
  }, [navigation, translateYAnim, scaleAnim, opacityAnim, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-5deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: opacityAnim,
          transform: [
            {translateY: translateYAnim},
            {scale: scaleAnim},
            {rotate: rotate},
          ],
        }}>
        <Image
          source={require('../../assets/Pajak.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
  },
  logo: {
    width: width > 400 ? 350 : 250,
    height: width > 400 ? 350 : 250,
  },
});
