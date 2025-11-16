import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}

export default function TitleText({children}: Props) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 14,
    margin: 0,
  },
});
