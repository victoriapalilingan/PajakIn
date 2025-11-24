import {getDatabase, ref, set, push} from 'firebase/database';
import {getCurrentUserId} from './firebaseAuthService';

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error',
};

export const NOTIFICATION_CATEGORIES = {
  VEHICLE_ADD: 'vehicle-add',
  VEHICLE_EDIT: 'vehicle-edit',
  VEHICLE_DELETE: 'vehicle-delete',
  DOCUMENT_UPLOAD: 'document-upload',
  DOCUMENT_DELETE: 'document-delete',
  TAX_REMINDER: 'tax-reminder',
};

export const createNotification = async notificationData => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const db = getDatabase();
  const now = new Date();
  const notifRef = push(ref(db, `notifications/${userId}`));

  const payload = {
    id: notifRef.key,
    type: notificationData.type || NOTIFICATION_TYPES.INFO,
    title: notificationData.title,
    subtitle: notificationData.subtitle || now.toLocaleString('id-ID'),
    timestamp: now.getTime(),
    category: notificationData.category,
    read: false,
  };

  await set(notifRef, payload);
  return notifRef.key;
};

export const notifyVehicleAdded = async vehiclePlate => {
  const now = new Date();
  return createNotification({
    type: NOTIFICATION_TYPES.SUCCESS,
    title: `Kendaraan ${vehiclePlate} berhasil ditambahkan`,
    subtitle: `Tambah kendaraan • ${now.toLocaleString('id-ID')}`,
    category: NOTIFICATION_CATEGORIES.VEHICLE_ADD,
  });
};

export const notifyVehicleUpdated = async vehiclePlate => {
  const now = new Date();
  return createNotification({
    type: NOTIFICATION_TYPES.SUCCESS,
    title: `Data kendaraan ${vehiclePlate} diperbarui`,
    subtitle: `Edit kendaraan • ${now.toLocaleString('id-ID')}`,
    category: NOTIFICATION_CATEGORIES.VEHICLE_EDIT,
  });
};

export const notifyVehicleDeleted = async vehiclePlate => {
  const now = new Date();
  return createNotification({
    type: NOTIFICATION_TYPES.WARNING,
    title: `Kendaraan ${vehiclePlate} dihapus`,
    subtitle: `Hapus kendaraan • ${now.toLocaleString('id-ID')}`,
    category: NOTIFICATION_CATEGORIES.VEHICLE_DELETE,
  });
};

export const notifyDocumentUploaded = async vehiclePlate => {
  const now = new Date();
  return createNotification({
    type: NOTIFICATION_TYPES.SUCCESS,
    title: `Dokumen untuk ${vehiclePlate || '-'} berhasil diunggah`,
    subtitle: `Unggah dokumen • ${now.toLocaleString('id-ID')}`,
    category: NOTIFICATION_CATEGORIES.DOCUMENT_UPLOAD,
  });
};

export const notifyDocumentDeleted = async vehiclePlate => {
  const now = new Date();
  return createNotification({
    type: NOTIFICATION_TYPES.WARNING,
    title: `Dokumen untuk ${vehiclePlate || '-'} dihapus`,
    subtitle: `Hapus dokumen • ${now.toLocaleString('id-ID')}`,
    category: NOTIFICATION_CATEGORIES.DOCUMENT_DELETE,
  });
};
