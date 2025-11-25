import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      // Kasih delay dikit biar splash-nya kelihatan
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
      }, 1200);
    });

    return () => unsubscribe();
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
