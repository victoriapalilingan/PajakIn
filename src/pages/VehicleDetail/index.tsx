import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {CustomHeader, SuccessPopup, Button} from '../../components';
import {CheckmarkIcon} from '../../assets';

import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, remove} from 'firebase/database';

const formatDisplayDate = dateString => {
  if (!dateString || dateString === '-') {
    return '-';
  }

  try {
    const date = new Date(dateString);
    const day = date.getDate();

    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
};

const VehicleDetailScreen = ({navigation, route}) => {
  const vehicleId = route?.params?.vehicleId;

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successVisible, setSuccessVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch detail kendaraan
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const db = getDatabase();
    const vehicleRef = ref(db, `vehicles/${currentUser.uid}/${vehicleId}`);

    const unsubscribe = onValue(
      vehicleRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          setVehicle({
            id: vehicleId,
            noPolisi: data.noPolisi || '-',
            jenisKendaraan: data.jenisKendaraan || '-',
            merekTahun: data.merekTahun || '-',
            tanggalJatuhTempo: data.tanggalJatuhTempo || '-',
            reminderActive: data.reminderActive ?? true,
            ...data,
          });
        } else {
          setVehicle(null);
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [vehicleId]);

  const handleDeleteVehicle = () => {
    if (!vehicleId) return;

    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus kendaraan ini?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              const auth = getAuth();
              const uid = auth.currentUser?.uid;

              if (!uid) {
                Alert.alert('Error', 'User tidak ditemukan');
                return;
              }

              const db = getDatabase();
              await remove(ref(db, `vehicles/${uid}/${vehicleId}`));

              setSuccessVisible(true);
            } catch (err) {
              console.log('Delete error:', err);
              Alert.alert('Error', 'Gagal menghapus kendaraan');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.fullScreenContainer}>
        <CustomHeader
          title="Detail Kendaraan"
          titleSize={22}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2E5E4E" />
          <Text style={styles.loadingText}>Memuat data kendaraan...</Text>
        </View>
      </View>
    );
  }

  if (!vehicleId || !vehicle) {
    return (
      <View style={styles.fullScreenContainer}>
        <CustomHeader
          title="Detail Kendaraan"
          titleSize={22}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            {!vehicleId
              ? 'ID kendaraan tidak valid'
              : 'Data kendaraan tidak ditemukan'}
          </Text>

          <Button
            label="Kembali"
            onPress={() => navigation.goBack()}
            width={150}
            height={45}
            color="#2E5E4E"
            textColor="#FFFFFF"
            fontSize={16}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <CustomHeader
        title="Detail Kendaraan"
        titleSize={22}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.content}>
          {/* Data Kendaraan */}
          <View style={styles.card}>
            <Text style={styles.label}>Nomor Polisi</Text>
            <Text style={styles.plateNumber}>{vehicle.noPolisi}</Text>

            <Text style={styles.vehicleInfo}>
              {vehicle.jenisKendaraan === 'mobil' ? 'Mobil' : 'Motor'},{' '}
              {vehicle.merekTahun}
            </Text>
          </View>

          {/* Status Pajak */}
          <View style={styles.card}>
            <Text style={styles.label}>Status Pajak</Text>

            <View style={styles.statusContainer}>
              <View style={styles.statusBadge}>
                <CheckmarkIcon
                  width={55}
                  height={55}
                  style={styles.checkmarkIconStyle}
                />
                <Text style={styles.statusText}>Aktif</Text>
              </View>
            </View>

            <Text style={styles.dateLabel}>Tanggal Jatuh Tempo Pajak</Text>
            <Text style={styles.dateValue}>
              {formatDisplayDate(vehicle.tanggalJatuhTempo)}
            </Text>
          </View>

          {/* Reminder */}
          <View style={styles.card}>
            <Text style={styles.label}>Pengingat Pajak</Text>
            <Text style={styles.reminderStatus}>
              {vehicle.reminderActive ? '🔔 Aktif' : '🔕 Nonaktif'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Tombol Edit & Hapus */}
      <View style={styles.fixedButtonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            label="Edit"
            onPress={() =>
              navigation.navigate('EditVehicle', {vehicleId: vehicle.id})
            }
            width="100%"
            height={51}
            color="#FFC107"
            textColor="#FFFFFF"
            fontSize={20}
            disabled={deleting}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            label={deleting ? 'Menghapus...' : 'Hapus'}
            onPress={handleDeleteVehicle}
            width="100%"
            height={51}
            color="#E53935"
            textColor="#FFFFFF"
            fontSize={20}
            disabled={deleting}
          />
        </View>
      </View>

      {/* Popup Berhasil Hapus */}
      <SuccessPopup
        visible={successVisible}
        title="Kendaraan berhasil dihapus"
        buttonLabel="Kembali ke Home"
        buttonWidth={230}
        buttonHeight={51}
        onButtonPress={() => {
          setSuccessVisible(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
        }}
      />
    </View>
  );
};

export default VehicleDetailScreen;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#2E5E4E',
    fontFamily: 'Montserrat-Regular',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  scrollViewContent: {
    flex: 1,
  },
  content: {
    padding: 40,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#2E5E4E',
    marginBottom: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  plateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#2E5E4E',
    fontFamily: 'Montserrat-SemiBold',
  },
  statusContainer: {
    marginVertical: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkIconStyle: {
    marginRight: 10,
  },
  statusText: {
    fontSize: 22,
    color: '#FFC107',
    fontFamily: 'Montserrat-SemiBold',
  },
  dateLabel: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
    color: '#2E5E4E',
    fontFamily: 'Montserrat-Regular',
  },
  dateValue: {
    fontSize: 16,
    color: '#2E5E4E',
    fontFamily: 'Montserrat-SemiBold',
  },
  reminderStatus: {
    fontSize: 18,
    marginTop: 5,
    color: '#2E5E4E',
    fontFamily: 'Montserrat-SemiBold',
  },
  fixedButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    backgroundColor: '#E8F5E9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});
