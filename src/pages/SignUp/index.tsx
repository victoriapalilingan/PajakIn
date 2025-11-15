import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Card from '../../components/molecules/Card';
import TextInput from '../../components/molecules/TextInput';
import CheckBox from '../../components/molecules/CheckBox';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';

import SuccessPopup from '../../components/molecules/SuccessPopup'; // <-- tambahkan ini

import IdentificationIcon from '../../assets/Identification Documents.svg';
import MaleIcon from '../../assets/Collaborator Male.svg';
import EmailIcon from '../../assets/Mobile Email.svg';
import PassIcon from '../../assets/Lock.svg';

import WhitePajakIn from '../../assets/Lock.svg';

const SignUp = ({navigation}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // <-- state popup

  const handleGoToAddDocument = () => {
    setShowSuccess(false);
    navigation.navigate('SignIn'); // or wherever you want to navigate after successful signup
  };

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
    // Saat ini: cukup tampilkan popup sukses
    setShowSuccess(true);
  };

  const handleGoToLogin = () => {
    navigation.navigate('SignIn');
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

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.overlay}>
            <Card>
              <Gap height={16} />
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

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Sudah Punya Akun? </Text>
                  <TouchableOpacity
                    onPress={handleGoToLogin}
                    activeOpacity={0.7}>
                    <Text style={styles.footerLink}>Masuk Sekarang</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Gap height={16} />
            </Card>

            <Gap height={16} />
            <Gap height={32} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Popup Sukses */}
      <SuccessPopup
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={'Akun anda\n berhasil didaftar!'}
        buttonLabel="Masuk Sekarang"
        onButtonPress={handleGoToAddDocument}
        buttonWidth={220} // ← custom lebar button
        buttonHeight={50} // ← custom tinggi button
        buttonColor="#2A6E54" // ← custom warna button (opsional)
      />
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
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
});
