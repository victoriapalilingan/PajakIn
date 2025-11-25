import {useEffect, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';
import {parseDate} from '../../utils/Date';

export const useHomeData = () => {
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [vehicleStats, setVehicleStats] = useState({
    aktif: 0,
    akanJatuhTempo: 0,
    telatBayar: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setError('Pengguna belum login');
      setLoading(false);
      return;
    }

    const db = getDatabase();


    const userRef = ref(db, `users/${currentUser.uid}`);
    const unsubscribeUser = onValue(
      userRef,
      snapshot => {
        const data = snapshot.val();
        if (data) {
          setUserName(data.fullname || '');
          setUserPhoto(data.photo || null);
        }
      },
      err => {
        console.log('User listener error:', err);
        setError('Gagal memuat data pengguna');
      },
    );

    const vehiclesRef = ref(db, `vehicles/${currentUser.uid}`);
    const unsubscribeVehicles = onValue(
      vehiclesRef,
      snapshot => {
        const data = snapshot.val();

        if (!data) {
          setVehicleStats({
            aktif: 0,
            akanJatuhTempo: 0,
            telatBayar: 0,
          });
          setLoading(false);
          return;
        }

        const vehicles = Object.values(data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let aktif = 0;
        let akanJatuhTempo = 0;
        let telatBayar = 0;

        vehicles.forEach(vehicle => {
          const dueDate = parseDate(vehicle.tanggalJatuhTempo);

          if (!dueDate) {
            aktif += 1;
            return;
          }

          const diffTime = dueDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 0) {
            telatBayar += 1;
          } else if (diffDays <= 30) {
            akanJatuhTempo += 1;
          } else {
            aktif += 1;
          }
        });

        setVehicleStats({aktif, akanJatuhTempo, telatBayar});
        setLoading(false);
      },
      err => {
        console.log('Vehicle listener error:', err);
        setError('Gagal memuat data kendaraan');
        setLoading(false);
      },
    );

    return () => {
      unsubscribeUser();
      unsubscribeVehicles();
    };
  }, []);

  return {
    userName,
    userPhoto,
    vehicleStats,
    loading,
    error,
  };
};
