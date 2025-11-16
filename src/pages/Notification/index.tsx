import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
// Pastikan path ini benar
import NotificationCard from '../../components/molecules/NotificationCard';
// TAMBAHAN: Import BottomNavigation
import BottomNavigation from '../../components/organism/BottomNavigation';

const {width: screenWidth} = Dimensions.get('window');

// 1. KOREKSI: Gunakan alias yang lebih ringkas dan hindari TypedNotificationCard
// Definisikan tipe untuk props NotificationCard
interface CardProps {
  title: string;
  subtitle: string;
  type: 'warning' | 'success';
}

// Type Assertion Helper untuk menghilangkan error/warning type
const Card = NotificationCard as React.ComponentType<CardProps>;

// HAPUS SEMUA VARIABEL YANG TIDAK TERPAKAI SEPERTI HEADER_CLEARANCE

export default function Notification(): JSX.Element {
  // Hitung padding horizontal agar Card (lebar 318) terpusat
  const horizontalPadding: number = (screenWidth - 318) / 2;
  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Notifikasi</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingHorizontal: horizontalPadding},
        ]}>
        <Card
          type="warning"
          title="Pajak B 1234 XYZ jatuh tempo 3 hari lagi"
          subtitle="Reminder - 14 Okt 2025 - 08.30"
        />

        <Card
          type="success"
          title="Dokumen STNK untuk B 1234 XYZ berhasil diunggah"
          subtitle="Arsip - 13 Okt - 19.12"
        />

        <Card
          type="warning"
          title="Pajak D 5678 ABC sudah lewat 1 hari"
          subtitle="Reminder - 10 Okt 2025 - 07.50"
        />

        {/* Mengganti inline style height: 50 dengan style sheet */}
        <View style={styles.scrollSpacer} />
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <BottomNavigation
        activeScreen="notification"
        onNavigate={(screen: string) => console.log('Navigating to', screen)}
        onAddPress={() => console.log('Add Button Pressed')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth + 60,
    height: 180,
    backgroundColor: '#2A6E54',
    borderBottomLeftRadius: 71.5,
    borderBottomRightRadius: 71.5,
    overflow: 'hidden',
    zIndex: 1,
    transform: [{translateX: -27}, {translateY: -23}],
  },

  headerTextContainer: {
    left: 65,
    top: 122,
    width: 150,
    height: 39,
    position: 'absolute',
  },

  headerText: {
    color: '#FEB800',
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
  },

  content: {
    paddingTop: 235,
    paddingBottom: 40,
    zIndex: 0,
  },

  scrollSpacer: {
    height: 100,
  },
});
