// src/pages/HistoryScreen/index.js
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import Button from '../../components/atoms/Button';
import ButtonFab from '../../components/atoms/ButtonFab';
import Gap from '../../components/atoms/Gap';
import Card from '../../components/molecules/Card';
import BottomNavigation from '../../components/organism/BottomNavigation';
// (opsional) kalau ada IconSvg dokumen, pakai di kiri item:
// import IconSvg from '../../components/atoms/IconSvg';

const DATA = [
  {
    id: '1',
    plate: 'B 1234 XYZ',
    info1: 'Pajak Tahunan · Dibayar 15 Agustus 2024',
    info2: 'Jatuh Tempo: 15 Agustus 2025',
    status: 'Aktif',
    action: 'Lihat Bukti Bayar',
    statusStyle: {bg: '#FFF3C4', text: '#7D5A00'}, // kuning lembut
  },
  {
    id: '2',
    plate: 'D 5678 ABC',
    info1: 'Pajak Tahunan · Dibayar 20 Juli 2024',
    info2: 'Jatuh Tempo: 20 Juli 2024',
    status: 'Segera Bayar (7 hari lagi)',
    action: 'Lihat Detail',
    statusStyle: {bg: '#FFF3C4', text: '#7D5A00'},
  },
  {
    id: '3',
    plate: 'DB 9123 VIC',
    info1: 'Pajak Tahunan · Telat 3 Hari',
    info2: 'Jatuh Tempo: 10 Okt 2024',
    status: 'Telat',
    action: 'Lihat Detail',
    statusStyle: {bg: '#FCE2E2', text: '#C0392B'},
  },
];

const HistoryScreen = ({navigation}) => {
  const renderItem = ({item}) => (
    <Card style={styles.card}>
      <View style={styles.itemRow}>
        {/* kiri ikon dokumen (pakai IconSvg kalau ada) */}
        <View style={styles.docIcon}>
          <View style={styles.docLineShort} />
          <View style={styles.docLineLong} />
          <View style={[styles.docLineLong, {opacity: 0.7, marginTop: 6}]} />
        </View>

        {/* kanan teks */}
        <View style={{flex: 1}}>
          <Text style={styles.plate}>{item.plate}</Text>
          <Text style={styles.info}>{item.info1}</Text>
          <Text style={styles.info}>{item.info2}</Text>

          <View style={styles.actionsRow}>
            <Button
              label={item.status}
              width={120}
              height={30}
              color={item.statusStyle.bg}
              textColor={item.statusStyle.text}
            />
            <Gap width={10} />
            <Button
              label={item.action}
              width={120}
              height={30}
              color="#FEDA5A"
              textColor="#2A6E54"
            />
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Riwayat Laporan</Text>

        <View style={styles.filters}>
          <Button
            label="Tahun Pajak ▼"
            width={132}
            height={36}
            color="#FEDA5A"
            textColor="#0E5E2E"
          />
          <Gap width={12} />
          <Button
            label="Jenis Pajak ▼"
            width={132}
            height={36}
            color="#FEDA5A"
            textColor="#0E5E2E"
          />
        </View>

        {/* ornamen lengkung bawah header */}
        <View style={styles.headerCurve} />
      </View>

      {/* List */}
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: 16}}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB tengah bawah */}
      <ButtonFab onPress={() => navigation.navigate('CreateReport')} />

      {/* Bottom Navigation (semua tombol harus jalan) */}
      <BottomNavigation
        active="History"
        onHome={() => navigation.navigate('Home')}
        onHistory={() => navigation.navigate('History')}
        onNotif={() => navigation.navigate('Notifications')}
        onProfile={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E6F3EA'},

  /* HEADER */
  header: {
    backgroundColor: '#0E5E2E',
    paddingTop: 52,
    paddingBottom: 18,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  title: {
    color: '#FFC82C',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 14,
  },
  headerCurve: {
    position: 'absolute',
    bottom: -22,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: '#0E5E2E',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  /* CARD ITEM */
  card: {
    width: '88%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  itemRow: {flexDirection: 'row'},
  docIcon: {
    width: 48,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    marginRight: 14,
    padding: 8,
    justifyContent: 'center',
  },
  docLineShort: {
    width: 18,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    marginBottom: 8,
  },
  docLineLong: {
    width: 28,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  plate: {fontWeight: '800', fontSize: 16, color: '#2A6E54', marginBottom: 6},
  info: {fontSize: 12, color: '#4E5F58'},
  actionsRow: {flexDirection: 'row', marginTop: 10},
});
