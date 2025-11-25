import {useState, useEffect} from 'react';
import {
  listenDocuments,
  createDocument,
  deleteDocument,
  validateImageSize,
} from '../../services/firebase/firebaseDocumentService';
import {updateVehicleDocument} from '../../services/firebase/firebaseVehicleService';
import {
  notifyDocumentUploaded,
  notifyDocumentDeleted,
} from '../../services/firebase/firebaseNotificationService';

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = listenDocuments(
      data => {
        setDocuments(data);
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

  const uploadDocument = async documentData => {
    if (!validateImageSize(documentData.imageBase64, 5)) {
      throw new Error('Ukuran gambar terlalu besar. Maksimal 5MB.');
    }

    try {
      const now = new Date();
      const isoTimestamp = now.toISOString();

      const documentId = await createDocument({
        vehicleId: documentData.vehicleId,
        vehiclePlate: documentData.vehiclePlate,
        imageBase64: documentData.imageBase64,
        fileName: documentData.fileName,
        fileType: documentData.fileType,
      });

      if (documentData.vehicleId) {
        await updateVehicleDocument(documentData.vehicleId, {
          fileName: documentData.fileName,
          fileType: documentData.fileType,
          uploadedAt: isoTimestamp,
          hasDocument: true,
        });
      }

      await notifyDocumentUploaded(documentData.vehiclePlate);

      return documentId;
    } catch (err) {
      throw err;
    }
  };


  const removeDocument = async document => {
    try {

      await deleteDocument(document.id);

      if (document.vehicleId) {
        await updateVehicleDocument(document.vehicleId, {
          fileName: null,
          fileType: null,
          uploadedAt: null,
          hasDocument: false,
        });
      }

      await notifyDocumentDeleted(document.vehiclePlate);
    } catch (err) {
      throw err;
    }
  };

  return {
    documents,
    loading,
    error,
    uploadDocument,
    removeDocument,
  };
};
