import React from 'react';
import {View, ViewStyle} from 'react-native';

// Definisikan Interface
interface IconSvgProps {
  source: React.ComponentType<any>; // Tipe untuk komponen SVG (misal: Home.svg)
  size?: number; // Lebar/Tinggi ikon
  color?: string; // Warna fill ikon
  style?: ViewStyle; // Style container
}

export default function IconSvg({
  source: SvgComponent,
  size = 24,
  color,
  style,
}: IconSvgProps): JSX.Element {
  return (
    <View style={style}>
      <SvgComponent width={size} height={size} fill={color} />
    </View>
  );
}
