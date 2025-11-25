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

import {
  CustomHeader,
  Button,
  SuccessPopup,
  ConfirmationPopup,
} from '../../components';
import {UploadIcon} from '../../assets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDocuments} from '../../hooks/useDocuments';
import {
  commonImageOptions,
  processImageResponse,
  formatFileSize,
} from '../../utils/ImageHelper';

const UnggahBerkas = ({navigation, route}) => {
  const vehicle = route?.params?.vehicle || null;

  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [chooseImageVisible, setChooseImageVisible] = useState(false);

  const {uploadDocument} = useDocuments();

  const handleImage = response => {
    try {
      const result = processImageResponse(response);
      if (result) setImage(result);
    } catch (err) {
      Alert.alert('Error', err.message || 'Gagal memproses gambar');
    }
  };

  const handleChooseCamera = () => {
    setChooseImageVisible(false);
    launchCamera(commonImageOptions, res => handleImage(res));
  };

  const handleChooseGallery = () => {
    setChooseImageVisible(false);
    launchImageLibrary(commonImageOptions, res => handleImage(res));
  };

  const handleSave = async () => {
    if (!image) {
      Alert.alert('Perhatian', 'Silakan pilih gambar terlebih dahulu');
      return;
    }

    if (!vehicle?.id) {
      Alert.alert('Perhatian', 'Data kendaraan tidak ditemukan');
      return;
    }

    setSaving(true);

    try {
      await uploadDocument({
        vehicleId: vehicle.id,
        vehiclePlate: vehicle.noPolisi || vehicle.plate || '-',
        imageBase64: image.base64,
        fileName: image.fileName,
        fileType: image.type,
      });

      setSuccessVisible(true);
    } catch (err) {
      Alert.alert(
        'Error',
        err?.message || 'Gagal menyimpan dokumen. Silakan coba lagi.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Unggah Berkas"
        titleSize={24}
        onBackPress={() => navigation.goBack()}
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
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{uri: image.uri}}
                style={styles.imagePreview}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={() => setChooseImageVisible(true)}>
                <Text style={styles.changeImageText}>Ganti Gambar</Text>
              </TouchableOpacity>

              <Text style={styles.fileName}>{image.fileName}</Text>
              {image.fileSize && (
                <Text style={styles.fileSize}>
                  {formatFileSize(image.fileSize)}
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
                onPress={() => setChooseImageVisible(true)}
                activeOpacity={0.8}>
                <Text style={styles.pickFileButtonText}>Pilih Gambar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={saving ? 'Menyimpan...' : 'Simpan'}
            onPress={handleSave}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
            width={355}
            disabled={saving || !image}
          />
        </View>
      </ScrollView>

      {saving && (
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

      <ConfirmationPopup
        visible={chooseImageVisible}
        onClose={() => setChooseImageVisible(false)}
        title="Pilih Sumber Gambar"
        message="Ambil foto dari kamera atau pilih dari galeri?"
        confirmLabel="Kamera"
        cancelLabel="Galeri"
        confirmButtonColor="#2D6B4F"
        cancelButtonColor="#2A9D8F"
        onConfirm={handleChooseCamera}
        onCancel={handleChooseGallery}
        loading={saving}
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
