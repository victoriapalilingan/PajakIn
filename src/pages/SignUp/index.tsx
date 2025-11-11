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

import Card from '../../components/molecules/Card';
import TextInput from '../../components/molecules/TextInput';
import CheckBox from '../../components/molecules/CheckBox';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';

// SVG khusus
import IdentificationIcon from '../../assets/Identification Documents.svg';
import MaleIcon from '../../assets/Collaborator Male.svg';
import EmailIcon from '../../assets/Mobile Email.svg';
import PassIcon from '../../assets/Lock.svg';

// logo PajakIn putih
import WhitePajakIn from '../../assets/Lock.svg';
const SignUp = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const fields = [
    {
      label: 'NIK',
      placeholder: 'NIK',
      keyboardType: 'number-pad',
      leftElement: <IdentificationIcon width={34} height={25} />,
    },
    {
      label: 'Nama Lengkap',
      placeholder: 'Nama Lengkap',
      leftElement: <MaleIcon width={34} height={25} />,
    },
    {
      label: 'Email atau No Hp',
      placeholder: 'Email atau No Hp',
      keyboardType: 'email-address',
      leftElement: <EmailIcon width={34} height={25} />,
    },
    {
      label: 'Password',
      placeholder: 'Password',
      secureTextEntry: true,
      leftElement: <PassIcon width={34} height={25} />,
      hideRightIcon: true,
    },
    {
      label: 'Konfirmasi Password',
      placeholder: 'Konfirmasi Password',
      secureTextEntry: true,
      hideLeftIcon: true,
      hideRightIcon: true,
    },
  ];

  const handleContinue = () => {
    if (!isAgreed) {
      console.log('Harap setujui Ketentuan dan Kebijakan Privasi');
      return;
    }
    console.log('Continue pressed');
  };

  const handleGoToLogin = () => {
    console.log('Go to Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/PajakIn.png')}
      style={styles.background}
      resizeMode="cover">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.overlay}>
        <Card>
          <Text style={styles.title}>Buatlah Akun Anda!</Text>
          <Gap height={6} />
          <Text style={styles.subtitle}>
            {'Isi Data dibawah ini untuk mulai\nmenggunakan PajakIn'}
          </Text>
          <Gap height={18} />

          {fields.map((f, idx) => (
            <React.Fragment key={idx}>
              <TextInput {...f} width={255} height={36} />
              {idx < fields.length - 1 && <Gap height={2} />}
            </React.Fragment>
          ))}

          <Gap height={4} />

          {/* Checkbox & tombol */}
          <View style={styles.centerContainer}>
            <View style={styles.checkboxWrapper}>
              <CheckBox
                label="Saya telah menyetujui Ketentuan dan Kebijakan Privasi PajakIn"
                checked={isAgreed}
                onPress={() => setIsAgreed(!isAgreed)}
              />
            </View>

            <Gap height={16} />

            <Button
              label="Daftar Sekarang"
              onPress={handleContinue}
              color="#2A6E54"
              textColor="#FFFFFF"
              width={255}
              height={38}
            />

            <Gap height={10} />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sudah Punya Akun? </Text>
              <TouchableOpacity onPress={handleGoToLogin} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Masuk Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Logo PajakIn putih */}
        <Image source={WhitePajakIn} style={styles.logo} resizeMode="contain" />
      </View>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  background: {flex: 1, width: '100%', height: '100%'},
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    color: '#2A6E53',
    fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    textAlign: 'center',
  },
  subtitle: {
    color: '#2A6E53',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 260,
    opacity: 0.95,
  },
  centerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  checkboxWrapper: {
    width: 255,
    alignItems: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
  },
  footerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#2A6E53',
  },
  footerLink: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#2A6E54',
  },
  logo: {
    width: 300,
    height: 96,
    marginTop: 1,
  },
});
