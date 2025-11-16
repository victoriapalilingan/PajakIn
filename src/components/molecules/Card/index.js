import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Card = ({title, subtitle, children, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.blueRing}>
        <View style={styles.card}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
  blueRing: {
    borderRadius: 44, // 40 + padding ring
    padding: 3,
    backgroundColor: '#2EA7FF',
  },
  card: {
    width: 341, // sesuai desain
    height: 700, // sesuai desain
    borderRadius: 40,
    backgroundColor: '#D7FFCD', // sesuai fill
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#0E5E2E',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#3E7C55',
    textAlign: 'center',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
