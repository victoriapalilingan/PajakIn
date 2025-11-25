import {useState, useEffect} from 'react';
import {
  listenVehicles,
  listenVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleDocument,
} from '../../services/firebase/firebaseVehicleService';

import {
  notifyVehicleAdded,
  notifyVehicleUpdated,
  notifyVehicleDeleted,
} from '../../services/firebase/firebaseNotificationService';

import {calculateDaysUntilDue, getTaxStatus} from '../../utils/Date';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = listenVehicles(
      data => {
        const transformed = data.map(vehicle => ({
          ...vehicle,
          daysUntilDue: calculateDaysUntilDue(vehicle.tanggalJatuhTempo),
          taxStatus: getTaxStatus(vehicle.tanggalJatuhTempo),
        }));

        setVehicles(transformed);
        setLoading(false);
        setError(null);
      },
      err => {
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const addVehicle = async vehicleData => {
    try {
      const vehicleId = await createVehicle(vehicleData);
      await notifyVehicleAdded(vehicleData.noPolisi);
      return vehicleId;
    } catch (err) {
      throw err;
    }
  };

  const updateVehicleData = async (vehicleId, updates) => {
    try {
      await updateVehicle(vehicleId, updates);
      await notifyVehicleUpdated(updates.noPolisi);
    } catch (err) {
      throw err;
    }
  };

  const removeVehicle = async (vehicleId, plateNumber) => {
    try {
      await deleteVehicle(vehicleId);
      await notifyVehicleDeleted(plateNumber);
    } catch (err) {
      throw err;
    }
  };

  const updateDocument = async (vehicleId, documentInfo) => {
    try {
      await updateVehicleDocument(vehicleId, documentInfo);
    } catch (err) {
      throw err;
    }
  };

  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.taxStatus === 'active').length,
    warning: vehicles.filter(v => v.taxStatus === 'warning').length,
    overdue: vehicles.filter(v => v.taxStatus === 'overdue').length,
  };

  return {
    vehicles,
    loading,
    error,
    stats,
    addVehicle,
    updateVehicleData,
    removeVehicle,
    updateDocument,
  };
};

export const useVehicle = vehicleId => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    const unsubscribe = listenVehicle(
      vehicleId,
      data => {
        const transformed = {
          ...data,
          daysUntilDue: calculateDaysUntilDue(data.tanggalJatuhTempo),
          taxStatus: getTaxStatus(data.tanggalJatuhTempo),
        };

        setVehicle(transformed);
        setLoading(false);
        setError(null);
      },
      err => {
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [vehicleId]);

  const updateVehicleData = async updates => {
    try {
      await updateVehicle(vehicleId, updates);
      await notifyVehicleUpdated(updates.noPolisi);
    } catch (err) {
      throw err;
    }
  };

  return {
    vehicle,
    loading,
    error,
    updateVehicleData,
  };
};
