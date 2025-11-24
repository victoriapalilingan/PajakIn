// src/hooks/useVehicleDetail.js
import {useEffect, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, remove} from 'firebase/database';

export const useVehicleDetail = vehicleId => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      setLoading(false);
      setError('Data kendaraan tidak tersedia');
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
          setError('Data kendaraan tidak ditemukan');
        }
        setLoading(false);
      },
      err => {
        console.log('Error fetch vehicle detail:', err);
        setError('Gagal memuat data kendaraan');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [vehicleId]);

  const deleteVehicle = async () => {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    if (!uid || !vehicleId) {
      throw new Error('User atau ID kendaraan tidak valid');
    }

    const db = getDatabase();
    await remove(ref(db, `vehicles/${uid}/${vehicleId}`));
  };

  return {
    vehicle,
    loading,
    error,
    deleteVehicle,
  };
};
