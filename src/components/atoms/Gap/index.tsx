import React from 'react';
import {View} from 'react-native';

// Definisikan Interface
interface GapProps {
  height: number;
}

export default function Gap({height}: GapProps): JSX.Element {
  return <View style={{height}} />;
}
