import {useEffect, useState} from 'react';
import {
  listenVehicle,
  deleteVehicle,
} from '../../services/firebase/firebaseVehicleService';
import {notifyVehicleDeleted} from '../../services/firebase/firebaseNotificationService';
import {calculateDaysUntilDue, getTaxStatus} from '../../utils/Date';

export const useVehicleDetail = vehicleId => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      setError('ID kendaraan tidak valid');
      return;
    }

    setLoading(true);

    const unsubscribe = listenVehicle(
      vehicleId,
      data => {
        if (!data) {
          setVehicle(null);
          setError('Data kendaraan tidak ditemukan');
          setLoading(false);
          return;
        }

        const transformed = {
          id: vehicleId,
          ...data,
          daysUntilDue: calculateDaysUntilDue(data.tanggalJatuhTempo),
          taxStatus: getTaxStatus(data.tanggalJatuhTempo),
          noPolisi: data.noPolisi || '-',
          jenisKendaraan: data.jenisKendaraan || '-',
          merekTahun: data.merekTahun || '-',
          tanggalJatuhTempo: data.tanggalJatuhTempo || '-',
          reminderActive: data.reminderActive ?? true,
        };

        setVehicle(transformed);
        setError(null);
        setLoading(false);
      },
      err => {
        console.log('Error listen vehicle detail:', err);
        setError(err?.message || 'Gagal memuat data kendaraan');
        setLoading(false);
      },
    );

    return () => unsubscribe && unsubscribe();
  }, [vehicleId]);

  const removeVehicle = async () => {
    if (!vehicleId) {
      throw new Error('ID kendaraan tidak valid');
    }
    if (!vehicle) {
      throw new Error('Data kendaraan tidak tersedia');
    }

    try {
      await deleteVehicle(vehicleId);
      await notifyVehicleDeleted(vehicle.noPolisi);
    } catch (err) {
      console.log('Error removeVehicle (hook):', err);
      throw err;
    }
  };

  return {
    vehicle,
    loading,
    error,
    removeVehicle,
  };
};
