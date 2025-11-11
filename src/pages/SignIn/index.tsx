import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Card from '../../components/molecules/Card';

import EmailIcon from '../../assets/Mobile Email.svg';
import PassIcon from '../../assets/Lock.svg';

const LoginScreen = ({navigation}: any) => {
  return (
    <ImageBackground
      source={require('../../assets/PajakIn.png')}
      style={styles.background}
      resizeMode="cover">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.overlay}>
        <Card>
          <Gap height={0} />
          <Text style={styles.title}>Masuk Ke PajakIn!</Text>

          <Image
            source={require('../../assets/signIn.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <TextInput
            label="Email atau No Hp"
            placeholder="Email atau No Hp"
            leftElement={<EmailIcon width={24} height={24} />}
            width={255}
            height={38}
          />

          <Gap height={8} />

          <TextInput
            label="Password"
            placeholder="Password"
            secureTextEntry
            leftElement={<PassIcon width={24} height={24} />}
            width={255}
            height={38}
          />

          <Gap height={16} />

          <View style={{marginLeft: 25}}>
            <Button
              label="Login"
              onPress={() => navigation.replace('Home')}
              color="#2A6E54"
              textColor="#FFFFFF"
              width={255}
              height={38}
            />
          </View>

          <Gap height={10} />

          <Text style={styles.orText}>OR</Text>

          <Gap height={10} />

          <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
            <Image
              source={require('../../assets/Google.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Masuk dengan Google</Text>
          </TouchableOpacity>

          <Gap height={16} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Tidak Punya Akun? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.7}>
              <Text style={styles.footerLink}>Registrasi Sekarang</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {flex: 1, width: '100%', height: '100%'},
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: 304,
    height: 261,
    alignSelf: 'center',

    marginLeft: 30,
  },
  title: {
    color: '#2A6E53',
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  orText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#2A6E53',
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    width: 255,
    height: 38,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 25,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#2A6E53',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
  },
  footerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#2A6E53',
  },
  footerLink: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 11,
    color: '#2A6E53',
  },
});
