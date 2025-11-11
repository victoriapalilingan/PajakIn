import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// Asumsi path yang benar adalah 2 tingkat ke atas (../components/molecules/ -> ../components/ -> ../src/ -> assets)
import GoBackIcon from '../../../assets/goback.svg';

const CustomHeader = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
      {/* Tombol Kembali */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <GoBackIcon width={55} height={55} />
      </TouchableOpacity>

      {/* Judul Tengah */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Penyeimbang Kanan (flex: 1) */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#26634C',
    paddingTop: 46,
    paddingBottom: 22,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  backButton: {
    width: 70,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1, // Jarak ke Judul
    marginLeft: 15, // Menarik tombol keluar dari padding 18px
  },

  headerTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    fontWeight: '700',
    color: '#FEB800',
    // Tidak perlu textAlign: 'center' karena rightSpacer yang memusatkan
  },

  rightSpacer: {flex: 1}, // PENTING untuk pemusatan
});

export default CustomHeader;
