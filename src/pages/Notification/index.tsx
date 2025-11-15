import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
// Pastikan path ini benar
import NotificationCard from '../../components/molecules/NotificationCard';
import BottomNavigation from '../../components/organism/BottomNavigation';

const {width: screenWidth} = Dimensions.get('window');

// --- DEFINISI KONSTANTA & TIPE ---
const PRIMARY_YELLOW = '#FEB800'; // Warna Kuning Emas dari headerText
const BACKGROUND_COLOR = '#F7F7F7'; // Warna latar belakang dari fullScreenContainer
const EMPTY_TEXT_COLOR = PRIMARY_YELLOW;

interface NotificationItem {
  title: string;
  subtitle: string;
  type: 'warning' | 'success';
}
type NotificationCardComponent = React.ComponentType<NotificationItem>;
const TypedNotificationCard = NotificationCard as NotificationCardComponent;

// --- DATA: GANTI INI UNTUK MENGUBAH TAMPILAN ---
const MOCK_NOTIFICATIONS: NotificationItem[] = []; // Array kosong untuk Empty State

// const MOCK_NOTIFICATIONS: NotificationItem[] = [ // Uncomment ini untuk tampilan terisi
//   { type: 'warning', title: 'Pajak B 1234 XYZ jatuh tempo 3 hari lagi', subtitle: 'Reminder - 14 Okt 2025 - 08.30' },
//   { type: 'success', title: 'Dokumen STNK untuk B 1234 XYZ berhasil diunggah', subtitle: 'Arsip - 13 Okt - 19.12' },
//   { type: 'warning', title: 'Pajak D 5678 ABC sudah lewat 1 hari', subtitle: 'Reminder - 10 Okt 2025 - 07.50' },
// ];

// --- FUNGSI UTAMA ---
export default function Notification(): JSX.Element {
  const notifications: NotificationItem[] = MOCK_NOTIFICATIONS;
  const isNotificationsEmpty = notifications.length === 0;

  // Header Anda memiliki tinggi 180 dan content dimulai di paddingTop: 235 (styles.content)
  const HEADER_END_PADDING = 235;
  const NAV_HEIGHT = 85; // Est. tinggi BottomNavigation

  // Hitung padding horizontal agar Card (lebar 318) terpusat
  const horizontalPadding: number = (screenWidth - 318) / 2;

  // Komponen konten Empty State
  const EmptyStateContent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Belum ada notifikasi</Text>
      <Text style={styles.emptySubtitle}>
        Kamu akan menerima pengingat pajak disini.
      </Text>
    </View>
  );

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2A6E54" />

      {/* 1. HEADER (TIDAK BERUBAH) */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Notifikasi</Text>
        </View>
      </View>

      {/* 2. KONTEN UTAMA (MODIFIKASI LOGIKA) */}
      {isNotificationsEmpty ? (
        // Tampilan Empty State: Ditempatkan di tengah area sisa (di bawah header, di atas nav)
        <View style={styles.emptyScreenWrapper}>
          <View style={styles.emptyCenterContent}>
            <EmptyStateContent />
          </View>
        </View>
      ) : (
        // Tampilan Notifikasi Terisi
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            {paddingHorizontal: horizontalPadding},
          ]}>
          {notifications.map((item, index) => (
            <TypedNotificationCard
              key={index}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
          <View style={styles.scrollSpacer} />
        </ScrollView>
      )}

      {/* 3. BOTTOM NAVIGATION BAR */}
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
    backgroundColor: BACKGROUND_COLOR,
  },
  // --- HEADER STYLE LAMA (TIDAK BERUBAH) ---
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth + 60,
    height: 180,
    backgroundColor: '#2A6E54', // Hijau tua
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
    color: PRIMARY_YELLOW,
    fontSize: 28,
    fontFamily: 'Montserrat-Bold', // FONT MONTSERRAT
  },
  // --- END HEADER STYLE LAMA ---

  // --- CONTENT STYLE LAMA ---
  content: {
    paddingTop: 235, // Memastikan konten dimulai di bawah header
    paddingBottom: 40,
    zIndex: 0,
    alignItems: 'center', // Penting untuk memusatkan NotificationCard
  },
  scrollSpacer: {
    height: 100, // Memberi ruang dari BottomNav
  },
  // --- END CONTENT STYLE LAMA ---

  // --- STYLE BARU UNTUK EMPTY STATE ---
  emptyScreenWrapper: {
    flex: 1,
    // Menggunakan paddingTop dan paddingBottom berdasarkan header/nav Anda
    paddingTop: 235, // Sama dengan content.paddingTop
    paddingBottom: 100, // Sama dengan scrollSpacer + margin bottom
    zIndex: 0,
  },
  emptyCenterContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Memastikan konten di tengah area kosong
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyTitle: {
    color: EMPTY_TEXT_COLOR,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold', // FONT MONTSERRAT
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular', // FONT MONTSERRAT
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 40,
  },
});
