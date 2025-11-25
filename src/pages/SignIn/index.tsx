import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import {TextInput, Button, Gap, Card} from '../../components';
import {EmailIcon, PassIcon} from '../../assets';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!email || !password) {
      showMessage({
        message: 'Email dan password tidak boleh kosong',
        type: 'danger',
      });
      return;
    }

    setLoading(true);

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Login success:', user);

        navigation.replace('Main');
      })
      .catch(error => {
        console.log('Login error:', error);

        let msg = 'Terjadi kesalahan, coba lagi.';

        switch (error.code) {
          case 'auth/user-not-found':
            msg = 'Akun tidak ditemukan.';
            break;
          case 'auth/wrong-password':
            msg = 'Password salah.';
            break;
          case 'auth/invalid-email':
            msg = 'Format email tidak valid.';
            break;
          case 'auth/too-many-requests':
            msg =
              'Terlalu banyak percobaan login. Coba lagi beberapa saat nanti.';
            break;
          default:
            msg = error.message || msg;
        }

        showMessage({
          message: msg,
          type: 'danger',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            value={email}
            onChangeText={value => setEmail(value)}
          />

          <Gap height={8} />

          <TextInput
            label="Password"
            placeholder="Password"
            leftElement={<PassIcon width={24} height={24} />}
            width={255}
            height={38}
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
          />

          <Gap height={16} />

          <View style={{marginLeft: 25}}>
            <Button
              label={loading ? 'Memproses...' : 'Login'}
              onPress={onSubmit}
              color="#2A6E54"
              textColor="#FFFFFF"
              width={255}
              height={38}
              fontSize={24}
              disabled={loading}
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
