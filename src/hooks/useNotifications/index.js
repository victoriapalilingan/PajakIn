import {useEffect, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, set} from 'firebase/database';

const formatDateTime = (date = new Date()) => {
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

// Generate notifikasi pajak berdasarkan data kendaraan
const generateTaxNotifications = (db, userId, vehiclesData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDateStr = today.toISOString().split('T')[0];

  Object.keys(vehiclesData).forEach(vehicleId => {
    const vehicle = vehiclesData[vehicleId];

    // Jika reminder aktif dan ada tanggal jatuh tempo
    if (vehicle.reminderActive !== false && vehicle.tanggalJatuhTempo) {
      const dueDate = new Date(vehicle.tanggalJatuhTempo);
      dueDate.setHours(0, 0, 0, 0);

      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Hanya generate jika dalam 7 hari ke depan atau sudah lewat max 30 hari
      if (diffDays <= 7 && diffDays >= -30) {
        const notifId = `tax-${vehicleId}-${todayDateStr}`;
        const notifRef = ref(db, `notifications/${userId}/${notifId}`);

        // Cek apakah notifikasi hari ini sudah ada
        onValue(
          notifRef,
          snapshot => {
            if (!snapshot.exists()) {
              let title = '';
              let type = 'warning';

              if (diffDays < 0) {
                const daysLate = Math.abs(diffDays);
                title = `Pajak ${vehicle.noPolisi} sudah lewat ${daysLate} hari`;
              } else if (diffDays === 0) {
                title = `Pajak ${vehicle.noPolisi} jatuh tempo hari ini`;
              } else {
                title = `Pajak ${vehicle.noPolisi} jatuh tempo ${diffDays} hari lagi`;
              }

              set(notifRef, {
                type,
                title,
                subtitle: `Reminder - ${formatDateTime(today)}`,
                timestamp: today.getTime(),
                vehicleId,
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

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      setError('Pengguna belum login');
      return;
    }

    const db = getDatabase();

    // 1. Listen kendaraan → generate notifikasi pajak otomatis
    const vehiclesRef = ref(db, `vehicles/${currentUser.uid}`);
    const unsubscribeVehicles = onValue(
      vehiclesRef,
      snapshot => {
        if (snapshot.exists()) {
          const vehiclesData = snapshot.val();
          generateTaxNotifications(db, currentUser.uid, vehiclesData);
        }
      },
      err => {
        console.log('Error fetching vehicles:', err);
      },
    );

    // 2. Listen notifikasi tersimpan
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

        // Urutkan terbaru di atas
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
      err => {
        console.log('Error fetching notifications:', err);
        setError('Gagal memuat notifikasi');
        setLoading(false);
      },
    );

    return () => {
      unsubscribeVehicles();
      unsubscribeNotifications();
    };
  }, []);

  return {
    notifications,
    loading,
    error,
  };
};
