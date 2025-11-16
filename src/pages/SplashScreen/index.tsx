import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoarding'); // pindah otomatis ke OnBoarding
    }, 2000); // delay 2 detik
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <View style={styles.innerCircle}>
          <Image
            source={require('../../assets/Pajak.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
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
  circleWrapper: {
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
  },
});
