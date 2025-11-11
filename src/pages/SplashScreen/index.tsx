import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Circle with shadow effect */}
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
    borderRadius: 140,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    width: 350,
    height: 350,
    borderRadius: 140,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 350,
    height: 350,
  },

  title: {
    marginTop: 30,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 32,
    color: '#2E7D32',
    letterSpacing: 1,
  },
});
