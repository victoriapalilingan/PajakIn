import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {CustomHeader, Button, SuccessPopup} from '../../components';
import {UploadIcon} from '../../assets';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, update, push, set} from 'firebase/database';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const commonImageOptions = {
  mediaType: 'photo',
  quality: 0.7,
  maxWidth: 800,
  maxHeight: 800,
  includeBase64: true,
};

const formatFileSize = bytes => {
  if (!bytes) return '';
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  return `${(kb / 1024).toFixed(1)} MB`;
};

const UnggahBerkas = ({navigation, route}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const vehicle = route?.params?.vehicle || null;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Pilih Sumber Gambar',
      'Ambil foto dari:',
      [
        {text: 'Kamera', onPress: openCamera},
        {text: 'Galeri', onPress: openGallery},
        {text: 'Batal', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const openCamera = () => {
    launchCamera(commonImageOptions, handleImageResponse);
  };

  const openGallery = () => {
    launchImageLibrary(commonImageOptions, handleImageResponse);
  };

  const handleImageResponse = response => {
    if (response?.didCancel) {
      return;
    }

    if (response?.errorCode) {
      Alert.alert('Error', 'Gagal mengambil gambar: ' + response.errorMessage);
      return;
    }

    if (response?.assets && response.assets.length > 0) {
      const asset = response.assets[0];

      if (!asset.base64) {
        Alert.alert('Error', 'Gagal mengkonversi gambar ke Base64');
        return;
      }

      setSelectedImage({
        uri: asset.uri,
        base64: asset.base64,
        fileName: asset.fileName || `image_${Date.now()}.jpg`,
        fileSize: asset.fileSize,
        type: asset.type || 'image/jpeg',
      });
    }
  };

  const handleSave = async () => {
    if (!selectedImage || !selectedImage.base64) {
      Alert.alert('Perhatian', 'Silakan pilih gambar terlebih dahulu');
      return;
    }

    if (!vehicle || !vehicle.id) {
      Alert.alert('Perhatian', 'Data kendaraan tidak ditemukan');
      return;
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Perhatian', 'Silakan login terlebih dahulu');
      return;
    }

    const base64Size = selectedImage.base64.length * 0.75;
    if (base64Size > 5 * 1024 * 1024) {
      Alert.alert('Perhatian', 'Ukuran gambar terlalu besar. Maksimal 5MB.');
      return;
    }

    setLoading(true);

    try {
      const db = getDatabase();
      const now = new Date();
      const isoTimestamp = now.toISOString();

      const vehicleRef = ref(db, `vehicles/${currentUser.uid}/${vehicle.id}`);
      await update(vehicleRef, {
        documentName: selectedImage.fileName,
        documentType: selectedImage.type,
        documentUploadedAt: isoTimestamp,
        hasDocument: true,
      });

      const documentRef = push(ref(db, `documents/${currentUser.uid}`));
      await set(documentRef, {
        id: documentRef.key,
        vehicleId: vehicle.id,
        vehiclePlate: vehicle.noPolisi || vehicle.plate || '-',
        imageBase64: selectedImage.base64,
        fileName: selectedImage.fileName,
        fileType: selectedImage.type,
        uploadedAt: isoTimestamp,
      });

      const notifTimestamp = now.getTime();
      const notifRef = push(ref(db, `notifications/${currentUser.uid}`));
      await set(notifRef, {
        id: notifRef.key,
        type: 'success',
        title: `Dokumen untuk ${vehicle.noPolisi || '-'} berhasil diunggah`,
        subtitle: `Unggah dokumen • ${now.toLocaleString('id-ID')}`,
        timestamp: notifTimestamp,
        category: 'document-upload',
        read: false,
      });

      setSuccessVisible(true);
    } catch (error) {
      Alert.alert(
        'Error',
        'Gagal menyimpan dokumen. ' + (error?.message || 'Silakan coba lagi.'),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Unggah Berkas"
        titleSize={24}
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {vehicle && (
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleLabel}>Kendaraan:</Text>
            <Text style={styles.vehiclePlate}>{vehicle.noPolisi || '-'}</Text>
          </View>
        )}

        <Text style={styles.subtitle}>
          Pilih dan unggah foto dokumen kendaraan Anda.
        </Text>

        <View style={styles.uploadBox}>
          {selectedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{uri: selectedImage.uri}}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={showImagePickerOptions}>
                <Text style={styles.changeImageText}>Ganti Gambar</Text>
              </TouchableOpacity>
              <Text style={styles.fileName}>{selectedImage.fileName}</Text>
              {selectedImage.fileSize && (
                <Text style={styles.fileSize}>
                  {formatFileSize(selectedImage.fileSize)}
                </Text>
              )}
            </View>
          ) : (
            <>
              <View style={styles.uploadIconWrapper}>
                <UploadIcon width={60} height={60} />
              </View>
              <Text style={styles.uploadTitle}>Pilih foto dokumen</Text>
              <Text style={styles.uploadDescription}>
                JPEG, PNG hingga 5 MB
              </Text>
              <TouchableOpacity
                style={styles.pickFileButton}
                onPress={showImagePickerOptions}
                activeOpacity={0.8}>
                <Text style={styles.pickFileButtonText}>Pilih Gambar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={loading ? 'Menyimpan...' : 'Simpan'}
            onPress={handleSave}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
            width={355}
            disabled={loading || !selectedImage}
          />
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2D6B4F" />
          <Text style={styles.loadingText}>Menyimpan dokumen...</Text>
        </View>
      )}

      <SuccessPopup
        visible={successVisible}
        title="Dokumen berhasil diunggah!"
        buttonLabel="Kembali ke Home"
        buttonWidth={230}
        buttonHeight={51}
        onButtonPress={() => {
          setSuccessVisible(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
        }}
      />
    </View>
  );
};

export default UnggahBerkas;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E8F5E9'},
  scrollView: {flex: 1},
  scrollContent: {paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40},
  vehicleInfo: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  vehicleLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  vehiclePlate: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#2D6B4F',
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: '#4A5F55',
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#90A4AE',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 4,
    marginBottom: 28,
  },
  uploadIconWrapper: {marginBottom: 24},
  uploadTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#2D6B4F',
    marginBottom: 10,
  },
  uploadDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#9E9E9E',
    marginBottom: 24,
  },
  imagePreviewContainer: {alignItems: 'center', width: '100%'},
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  changeImageButton: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  changeImageText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#2D6B4F',
  },
  fileName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#2D6B4F',
    marginBottom: 4,
  },
  fileSize: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: '#757575',
  },
  pickFileButton: {
    backgroundColor: '#2D6B4F',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
  },
  pickFileButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
  buttonContainer: {alignItems: 'center', marginTop: 12},
  saveButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#2D6B4F',
  },
});
