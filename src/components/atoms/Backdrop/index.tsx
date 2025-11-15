// src/components/atoms/Backdrop/index.tsx

import React from 'react';
import {StyleSheet, View, Pressable, ViewStyle} from 'react-native';

// 1. Definisikan Tipe Data menggunakan TypeScript Interface
interface BackdropProps {
  visible: boolean; // Tipe boolean
  onPress: () => void; // Tipe fungsi yang tidak mengembalikan apapun
}

// 2. Terapkan Tipe Data ke Komponen
const Backdrop: React.FC<BackdropProps> = ({visible, onPress}) => {
  // 3. Koreksi Logika: Jika tidak visible, kembalikan null
  if (!visible) {
    return null;
  }

  // Gunakan Pressable dengan style dari stylesheet
  return <Pressable style={styles.backdrop} onPress={onPress} />;
};

// 4. Hapus PropTypes yang tidak perlu

export default Backdrop;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  } as ViewStyle, // Tambahkan ViewStyle untuk memastikan tipe data yang benar
});
