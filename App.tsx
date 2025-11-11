import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
// Di file index.js atau App.js
import {LogBox} from 'react-native';

// Menonaktifkan LogBox sepenuhnya (Hanya untuk debugging, jangan dibiarkan di production)
LogBox.ignoreAllLogs();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Tes Font Montserrat Black</Text>
        <Text style={styles.body}> teks biasa</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Montserrat-Black', // sesuai nama file font tanpa .ttf
  },
  body: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
});
