import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, set} from 'firebase/database';

import {NotificationCard, CustomHeader, Gap} from '../../components';

const {width: screenWidth} = Dimensions.get('window');
const Card = NotificationCard;

export default function Notification() {
  const horizontalPadding = (screenWidth - 318) / 2;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function untuk format tanggal
  const formatDate = (date = new Date()) => {
    const d = new Date(date);
    const day = d.getDate();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} - ${hours}.${minutes}`;
  };

  // Helper function untuk generate notifikasi pajak
  const generateTaxNotifications = async (userId, vehiclesData) => {
    const db = getDatabase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayDateStr = today.toISOString().split('T')[0];

    Object.keys(vehiclesData).forEach(async vehicleId => {
      const vehicle = vehiclesData[vehicleId];

      // Cek jika reminder aktif dan ada tanggal jatuh tempo
      if (vehicle.reminderActive !== false && vehicle.tanggalJatuhTempo) {
        const dueDate = new Date(vehicle.tanggalJatuhTempo);
        dueDate.setHours(0, 0, 0, 0);

        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Generate notifikasi jika dalam 7 hari atau sudah lewat (max 30 hari)
        if (diffDays <= 7 && diffDays >= -30) {
          const notifId = `tax-${vehicleId}-${todayDateStr}`;
          const notifRef = ref(db, `notifications/${userId}/${notifId}`);

          // Cek apakah notifikasi hari ini sudah dibuat
          onValue(
            notifRef,
            snapshot => {
              if (!snapshot.exists()) {
                let title = '';
                let type = 'warning';

                if (diffDays < 0) {
                  const daysLate = Math.abs(diffDays);
                  title = `Pajak ${vehicle.noPolisi} sudah lewat ${daysLate} hari`;
                  type = 'warning';
                } else if (diffDays === 0) {
                  title = `Pajak ${vehicle.noPolisi} jatuh tempo hari ini`;
                  type = 'warning';
                } else {
                  title = `Pajak ${vehicle.noPolisi} jatuh tempo ${diffDays} hari lagi`;
                  type = 'warning';
                }

                // Buat notifikasi baru
                set(notifRef, {
                  type: type,
                  title: title,
                  subtitle: `Reminder - ${formatDate(today)}`,
                  timestamp: today.getTime(),
                  vehicleId: vehicleId,
                  category: 'tax-reminder',
                  read: false,
                }).catch(error => {
                  console.log('Error creating tax notification:', error);
                });
              }
            },
            {onlyOnce: true},
          );
        }
      }
    });
  };

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const db = getDatabase();

    // 1. Listen untuk kendaraan (untuk generate notifikasi pajak otomatis)
    const vehiclesRef = ref(db, `vehicles/${currentUser.uid}`);
    const unsubscribeVehicles = onValue(
      vehiclesRef,
      snapshot => {
        if (snapshot.exists()) {
          const vehiclesData = snapshot.val();
          // Generate notifikasi pajak otomatis
          generateTaxNotifications(currentUser.uid, vehiclesData);
        }
      },
      error => {
        console.log('Error fetching vehicles:', error);
      },
    );

    // 2. Listen untuk notifikasi yang tersimpan
    const notificationsRef = ref(db, `notifications/${currentUser.uid}`);
    const unsubscribeNotifications = onValue(
      notificationsRef,
      snapshot => {
        const notificationsList = [];

        if (snapshot.exists()) {
          const notifData = snapshot.val();

          Object.keys(notifData).forEach(notifId => {
            const notif = notifData[notifId];
            notificationsList.push({
              id: notifId,
              ...notif,
            });
          });
        }

        // Urutkan berdasarkan timestamp (terbaru di atas)
        notificationsList.sort((a, b) => {
          const ta =
            typeof a.timestamp === 'number'
              ? a.timestamp
              : Date.parse(a.timestamp || 0);
          const tb =
            typeof b.timestamp === 'number'
              ? b.timestamp
              : Date.parse(b.timestamp || 0);
          return tb - ta;
        });

        setNotifications(notificationsList);
        setLoading(false);
      },
      error => {
        console.log('Error fetching notifications:', error);
        setLoading(false);
      },
    );

    return () => {
      unsubscribeVehicles();
      unsubscribeNotifications();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.fullScreenContainer}>
        <CustomHeader title="Notifikasi" alignLeft />
        <Gap height={24} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2D6A4F" />
          <Text style={styles.loadingText}>Memuat notifikasi...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <CustomHeader title="Notifikasi" alignLeft />
      <Gap height={24} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingHorizontal: horizontalPadding},
        ]}
        showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada notifikasi</Text>
          </View>
        ) : (
          notifications.map((item, index) => (
            <Card
              key={item.id || index}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))
        )}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#2A6E53',
    fontFamily: 'Montserrat-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#8D92A3',
    fontFamily: 'Montserrat-Medium',
  },
});
