// src/services/firebase/firebaseVehicleService.js

import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue,
} from 'firebase/database';
import {getCurrentUserId} from './firebaseAuthService';

// Listen seluruh kendaraan milik user
export const listenVehicles = (onSuccess, onError) => {
  const userId = getCurrentUserId();
  if (!userId) {
    if (onError) onError(new Error('User not authenticated'));
    return () => {};
  }

  const db = getDatabase();
  const vehiclesRef = ref(db, `vehicles/${userId}`);

  const unsubscribe = onValue(
    vehiclesRef,
    snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const vehiclesList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        onSuccess(vehiclesList);
      } else {
        onSuccess([]);
      }
    },
    error => {
      console.log('Error listening vehicles:', error);
      if (onError) onError(error);
    },
  );

  return unsubscribe;
};

// Listen satu kendaraan berdasarkan ID
export const listenVehicle = (vehicleId, onSuccess, onError) => {
  const userId = getCurrentUserId();
  if (!userId || !vehicleId) {
    if (onError) onError(new Error('Invalid parameters'));
    return () => {};
  }

  const db = getDatabase();
  const vehicleRef = ref(db, `vehicles/${userId}/${vehicleId}`);

  const unsubscribe = onValue(
    vehicleRef,
    snapshot => {
      if (snapshot.exists()) {
        onSuccess(snapshot.val());
      } else {
        if (onError) onError(new Error('Vehicle not found'));
      }
    },
    error => {
      console.log('Error listening vehicle:', error);
      if (onError) onError(error);
    },
  );

  return unsubscribe;
};

// Membuat kendaraan baru
export const createVehicle = async vehicleData => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const db = getDatabase();
  const now = new Date();
  const vehicleId = Date.now().toString();

  const payload = {
    id: vehicleId,
    ...vehicleData,
    createdAt: now.toISOString(),
  };

  await set(ref(db, `vehicles/${userId}/${vehicleId}`), payload);

  return vehicleId;
};

// Update kendaraan
export const updateVehicle = async (vehicleId, updates) => {
  const userId = getCurrentUserId();
  if (!userId || !vehicleId) {
    throw new Error('Invalid parameters');
  }

  const db = getDatabase();
  const now = new Date();

  const payload = {
    ...updates,
    updatedAt: now.toISOString(),
  };

  await update(ref(db, `vehicles/${userId}/${vehicleId}`), payload);
};

// Hapus kendaraan
export const deleteVehicle = async vehicleId => {
  const userId = getCurrentUserId();
  if (!userId || !vehicleId) {
    throw new Error('Invalid parameters');
  }

  const db = getDatabase();
  await remove(ref(db, `vehicles/${userId}/${vehicleId}`));
};

// Update informasi dokumen kendaraan
export const updateVehicleDocument = async (vehicleId, documentInfo) => {
  const userId = getCurrentUserId();
  if (!userId || !vehicleId) {
    throw new Error('Invalid parameters');
  }

  const db = getDatabase();
  const vehicleRef = ref(db, `vehicles/${userId}/${vehicleId}`);

  await update(vehicleRef, {
    documentName: documentInfo.fileName || null,
    documentType: documentInfo.fileType || null,
    documentUploadedAt: documentInfo.uploadedAt || null,
    hasDocument: documentInfo.hasDocument || false,
  });
};
