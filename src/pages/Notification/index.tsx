import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

import NotificationCard from '../../components/molecules/NotificationCard';
import CustomHeader from '../../components/molecules/CustomHeader';
import Gap from '../../components/atoms/Gap';

const {width: screenWidth} = Dimensions.get('window');

const Card = NotificationCard;

export default function Notification() {
  // Hitung padding horizontal agar Card (lebar 318) terpusat
  const horizontalPadding = (screenWidth - 318) / 2;

  const documents = [
    {
      type: 'warning',
      title: 'Pajak B 1234 XYZ jatuh tempo 3 hari lagi',
      subtitle: 'Reminder - 14 Okt 2025 - 08.30',
    },
    {
      type: 'success',
      title: 'Dokumen STNK untuk B 1234 XYZ berhasil diunggah',
      subtitle: 'Arsip - 13 Okt - 19.12',
    },
    {
      type: 'warning',
      title: 'Pajak D 5678 ABC sudah lewat 1 hari',
      subtitle: 'Reminder - 10 Okt 2025 - 07.50',
    },
  ];

  return (
    <View style={styles.fullScreenContainer}>
      {/* HEADER */}
      <CustomHeader title="Notifikasi" alignLeft />

      <Gap height={24} />

      {/* LIST NOTIFIKASI */}
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingHorizontal: horizontalPadding},
        ]}>
        {documents.map((item, index) => (
          <Card
            key={index}
            type={item.type}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}

        <View style={styles.scrollSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F1FEF0',
  },
  content: {
    paddingTop: 24,
    paddingBottom: 40,
    zIndex: 0,
  },
  scrollSpacer: {
    height: 100,
  },
});
