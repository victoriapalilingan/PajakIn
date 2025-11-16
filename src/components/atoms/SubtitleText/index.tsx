import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}

export default function SubtitleText({children}: Props) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 12,
    color: '#777',
    margin: 0,
  },
});
