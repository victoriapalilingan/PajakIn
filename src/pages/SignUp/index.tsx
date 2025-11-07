import React from 'react';
import {StyleSheet, Text, View, ImageBackground, StatusBar} from 'react-native';
import Card from '../../components/molecules/Card';
import TextInput from '../../components/molecules/TextInput';

// SVG khusus
import IdentificationIcon from '../../assets/Identification Documents.svg';
import MaleIcon from '../../assets/Collaborator Male.svg';
import EmailIcon from '../../assets/Mobile Email.svg';
import PassIcon from '../../assets/Lock.svg';

const SignUp = () => {
  const fields = [
    {
      label: 'NIK',
      placeholder: 'NIK',
      keyboardType: 'number-pad',
      leftElement: <IdentificationIcon width={20} height={20} />,
    },
    {
      label: 'Nama Lengkap',
      placeholder: 'Nama Lengkap',
      leftElement: <MaleIcon width={20} height={20} />,
    },
    {
      label: 'Email atau No Hp',
      placeholder: 'Email atau No Hp',
      keyboardType: 'email-address',
      leftElement: <EmailIcon width={20} height={20} />,
    },
    {
      label: 'Password',
      placeholder: 'Password',
      secureTextEntry: true,
      leftElement: <PassIcon width={20} height={20} />,
      hideRightIcon: true, // kalau mau tanpa eye icon
    },
    {
      label: 'Konfirmasi Password',
      placeholder: 'Konfirmasi Password',
      secureTextEntry: true,
      // opsi A: pakai ikon Feather
      // leftIconName: 'lock',
      // opsi B (tanpa ikon kiri sama sekali):
      hideLeftIcon: true,
      hideRightIcon: true, // konfirmasi biasanya tidak perlu toggle
    },
  ];

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
          <Text style={styles.subtitle}>
            Isi Data dibawah ini untuk mulai menggunakan PajakIn
          </Text>

          {fields.map((f, idx) => (
            <TextInput key={idx} {...f} width={255} height={36} />
          ))}
        </Card>
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
    color: '#1B3C29',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#1B3C29',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 18,
  },
});
