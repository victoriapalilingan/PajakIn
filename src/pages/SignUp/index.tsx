import React from 'react';
import {StyleSheet, Text, View, ImageBackground, StatusBar} from 'react-native';
import Card from '../../components/molecules/Card';

const SignUp = () => {
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
          <Text> </Text>
        </Card>
      </View>
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight, // supaya tidak ketimpa status bar
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
  },
});
