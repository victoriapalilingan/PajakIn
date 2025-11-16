import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';

const History = () => {
  return (
    <View style={styles.container}>
      <Header label="History" />
      <View style={styles.contentWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card 1 */}
          <View style={styles.card}>
            <View style={styles.rowSpace}>
              <Text style={styles.title}>Pengeluaran Bengkel</Text>
              <Text style={styles.amountMinus}>- Rp. 40.000</Text>
            </View>
            <Gap height={6} />
            <Text style={styles.date}>Rabu, 10 September 2025</Text>
            <Gap height={12} />
            <View style={styles.row}>
              {/* ICON DIHAPUS */}
              <Gap width={8} />
              <Text style={styles.category}>Sparepart</Text>
            </View>
          </View>

          <Gap height={16} />

          {/* Card 2 */}
          <View style={styles.card}>
            <View style={styles.rowSpace}>
              <Text style={styles.title}>Gaji Karyawan</Text>
              <Text style={styles.amountMinus}>- Rp. 1.500.000</Text>
            </View>
            <Gap height={6} />
            <Text style={styles.date}>Selasa, 9 September 2025</Text>
            <Gap height={12} />
            <View style={styles.row}>
              {/* ICON DIHAPUS */}
              <Gap width={8} />
              <Text style={styles.category}>Karyawan</Text>
            </View>
          </View>

          <Gap height={16} />

          {/* Card 3 */}
          <View style={styles.card}>
            <View style={styles.rowSpace}>
              <Text style={styles.title}>Pembelian Oli</Text>
              <Text style={styles.amountMinus}>- Rp. 90.000</Text>
            </View>
            <Gap height={6} />
            <Text style={styles.date}>Senin, 8 September 2025</Text>
            <Gap height={12} />
            <View style={styles.row}>
              {/* ICON DIHAPUS */}
              <Gap width={8} />
              <Text style={styles.category}>Persediaan</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {flex: 1},
  contentWrapper: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 26,
  },
  card: {
    backgroundColor: '#F6F7F8',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {fontSize: 16, fontWeight: '600', color: '#020202'},
  amountMinus: {fontSize: 16, fontWeight: '600', color: '#D9435E'},
  date: {fontSize: 12, color: '#8D92A3'},
  row: {flexDirection: 'row', alignItems: 'center'},
  rowSpace: {flexDirection: 'row', justifyContent: 'space-between'},
  category: {fontSize: 14, color: '#020202'},
});
