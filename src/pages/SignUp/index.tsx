import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {
  Card,
  TextInput,
  CheckBox,
  Gap,
  Button,
  SuccessPopup,
} from '../../components';

import {IdentificationIcon, MaleIcon, EmailIcon, PassIcon} from '../../assets';
import {showMessage} from 'react-native-flash-message';

import {useAuth} from '../../hooks/useAuth';

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

const SignUp = ({navigation}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [nik, setNik] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {register} = useAuth();

  const getFieldProps = label => {
    switch (label) {
      case 'NIK':
        return {value: nik, onChangeText: setNik};
      case 'Nama Lengkap':
        return {value: fullname, onChangeText: setFullName};
      case 'Email atau No Hp':
        return {value: email, onChangeText: setEmail};
      case 'Password':
        return {value: password, onChangeText: setPassword};
      case 'Konfirmasi Password':
        return {value: confirmPassword, onChangeText: setConfirmPassword};
      default:
        return {};
    }
  };

  const validateForm = () => {
    if (!isAgreed) {
      showMessage({
        message:
          'Harap setujui Ketentuan dan Kebijakan Privasi terlebih dahulu',
        type: 'danger',
      });
      return false;
    }

    if (!nik || !fullname || !email || !password || !confirmPassword) {
      showMessage({
        message: 'Semua field wajib diisi',
        type: 'danger',
      });
      return false;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: 'Password dan Konfirmasi Password tidak sama',
        type: 'danger',
      });
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const user = await register({
        email,
        password,
        nik,
        fullname,
      });

      console.log('User created:', user);
      setShowSuccess(true);
    } catch (error) {
      console.log('Signup error:', error);

      showMessage({
        message: error?.message || 'Gagal mendaftarkan akun',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const goToSignIn = () => {
    setShowSuccess(false);
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

              {fields.map((f, idx) => {
                const fieldProps = getFieldProps(f.label);
                return (
                  <View key={f.label}>
                    <TextInput {...f} {...fieldProps} width={255} height={36} />
                    {idx < fields.length - 1 && <Gap height={2} />}
                  </View>
                );
              })}

              <Gap height={4} />

              <View style={styles.centerContainer}>
                <View style={styles.checkboxWrapper}>
                  <CheckBox
                    label="Saya telah menyetujui Ketentuan dan Kebijakan Privasi PajakIn"
                    checked={isAgreed}
                    onPress={() => setIsAgreed(prev => !prev)}
                  />
                </View>

                <Gap height={16} />

                <Button
                  label={loading ? 'Memproses...' : 'Daftar Sekarang'}
                  onPress={onSubmit}
                  color="#2A6E54"
                  textColor="#FFFFFF"
                  width={255}
                  height={38}
                  disabled={loading}
                />

                <Gap height={10} />

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Sudah Punya Akun? </Text>
                  <TouchableOpacity onPress={goToSignIn} activeOpacity={0.7}>
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

      <SuccessPopup
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={'Akun anda\n berhasil didaftar!'}
        buttonLabel="Masuk Sekarang"
        onButtonPress={goToSignIn}
        buttonWidth={220}
        buttonHeight={50}
        buttonColor="#2A6E54"
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
