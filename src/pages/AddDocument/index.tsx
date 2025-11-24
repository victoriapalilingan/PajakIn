import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {CustomHeader, Button, SuccessPopup} from '../../components';
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

  const {uploadDocument} = useDocuments();

  // -------------------------
  // IMAGE PICKING (cleaned)
  // -------------------------
  const pickImage = () => {
    Alert.alert(
      'Pilih Sumber Gambar',
      'Ambil foto dari:',
      [
        {
          text: 'Kamera',
          onPress: () =>
            launchCamera(commonImageOptions, res => handleImage(res)),
        },
        {
          text: 'Galeri',
          onPress: () =>
            launchImageLibrary(commonImageOptions, res => handleImage(res)),
        },
        {text: 'Batal', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const handleImage = response => {
    try {
      const result = processImageResponse(response);
      if (result) setImage(result);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  // -------------------------
  // SAVE DOCUMENT
  // -------------------------
  const handleSave = async () => {
    if (!image) return Alert.alert('Perhatian', 'Silakan pilih gambar dahulu');
    if (!vehicle?.id)
      return Alert.alert('Error', 'Data kendaraan tidak ditemukan');

    setSaving(true);

    try {
      await uploadDocument({
        vehicleId: vehicle.id,
        vehiclePlate: vehicle.noPolisi || '-',
        imageBase64: image.base64,
        fileName: image.fileName,
        fileType: image.type,
      });

      setSuccessVisible(true);
    } catch (err) {
      Alert.alert('Error', err.message || 'Gagal menyimpan dokumen');
    } finally {
      setSaving(false);
    }
  };

  // -------------------------
  // RENDER
  // -------------------------
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
            <Text style={styles.label}>Kendaraan:</Text>
            <Text style={styles.plate}>{vehicle.noPolisi || '-'}</Text>
          </View>
        )}

        <Text style={styles.subtitle}>
          Pilih dan unggah foto dokumen kendaraan Anda.
        </Text>

        <View style={styles.uploadBox}>
          {image ? (
            <View style={styles.previewContainer}>
              <Image source={{uri: image.uri}} style={styles.preview} />
              <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
                <Text style={styles.changeText}>Ganti Gambar</Text>
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
              <UploadIcon width={60} height={60} style={{marginBottom: 20}} />
              <Text style={styles.uploadTitle}>Pilih foto dokumen</Text>
              <Text style={styles.uploadDesc}>JPEG, PNG hingga 5 MB</Text>

              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                style={styles.pickButton}>
                <Text style={styles.pickButtonText}>Pilih Gambar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={saving ? 'Menyimpan...' : 'Simpan'}
            onPress={handleSave}
            disabled={saving || !image}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
            width={355}
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
          navigation.reset({index: 0, routes: [{name: 'Main'}]});
        }}
      />
    </View>
  );
};

export default UnggahBerkas;
