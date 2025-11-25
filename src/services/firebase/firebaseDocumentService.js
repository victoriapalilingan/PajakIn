import {getDatabase, ref, set, remove, onValue, push} from 'firebase/database';
import {getCurrentUserId} from './firebaseAuthService';

export const listenDocuments = (onSuccess, onError) => {
  const userId = getCurrentUserId();
  if (!userId) {
    if (onError) onError(new Error('User not authenticated'));
    return () => {};
  }

  const db = getDatabase();
  const documentsRef = ref(db, `documents/${userId}`);

  const unsubscribe = onValue(
    documentsRef,
    snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const documentsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        documentsList.sort((a, b) => {
          const ta = new Date(a.uploadedAt).getTime();
          const tb = new Date(b.uploadedAt).getTime();
          return tb - ta;
        });

        onSuccess(documentsList);
      } else {
        onSuccess([]);
      }
    },
    error => {
      console.log('Error listening documents:', error);
      if (onError) onError(error);
    },
  );

  return unsubscribe;
};

export const createDocument = async documentData => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const db = getDatabase();
  const now = new Date();
  const documentRef = push(ref(db, `documents/${userId}`));

  const payload = {
    id: documentRef.key,
    ...documentData,
    uploadedAt: now.toISOString(),
  };

  await set(documentRef, payload);
  return documentRef.key;
};

export const deleteDocument = async documentId => {
  const userId = getCurrentUserId();
  if (!userId || !documentId) {
    throw new Error('Invalid parameters');
  }

  const db = getDatabase();
  await remove(ref(db, `documents/${userId}/${documentId}`));
};

export const validateImageSize = (base64String, maxSizeMB = 5) => {
  if (!base64String) return false;

  const base64Size = base64String.length * 0.75;
  const maxBytes = maxSizeMB * 1024 * 1024;

  return base64Size <= maxBytes;
};
