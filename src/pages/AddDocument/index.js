import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomHeader from '../../components/molecules/CustomHeader';
import Button from '../../components/atoms/Button';
import UploadIcon from '../../assets/Upload.svg';

const UnggahBerkas = ({navigation}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePickFile = () => {
    // Placeholder untuk file picker
    // Gunakan library seperti react-native-document-picker
    Alert.alert('Info', 'Fitur pilih file akan diimplementasikan');

    // Contoh dummy file selected
    setSelectedFile({
      name: 'dokumen_pajak.pdf',
      size: '2.5 MB',
      type: 'application/pdf',
    });
  };

  const handleSave = () => {
    if (!selectedFile) {
      Alert.alert('Perhatian', 'Silakan pilih berkas terlebih dahulu');
      return;
    }

    // Logic untuk save/upload file
    Alert.alert('Sukses', 'Berkas berhasil disimpan');
    console.log('Saving file:', selectedFile);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Unggah Berkas" onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Pilih dan unggah berkas sesuai kebutuhan Anda.
        </Text>

        {/* Upload Box */}
        <View style={styles.uploadBox}>
          <View style={styles.uploadIconWrapper}>
            <UploadIcon width={60} height={60} />
          </View>

          <Text style={styles.uploadTitle}>Pilih berkas atau dokumen</Text>
          <Text style={styles.uploadDescription}>
            JPEG, PNG, dan PDF hingga 50 MB.
          </Text>

          {selectedFile && (
            <View style={styles.filePreview}>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>{selectedFile.size}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.pickFileButton}
            onPress={handlePickFile}
            activeOpacity={0.8}>
            <Text style={styles.pickFileButtonText}>Pilih Berkas</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            label="Simpan"
            onPress={handleSave}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UnggahBerkas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },

  // SCROLL VIEW
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // SUBTITLE
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: '#4A5F55',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  // UPLOAD BOX
  uploadBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#90A4AE',
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 28,
  },

  // UPLOAD ICON WRAPPER
  uploadIconWrapper: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // UPLOAD TEXT
  uploadTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#2D6B4F',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  uploadDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 16,
  },

  // FILE PREVIEW
  filePreview: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  fileName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#2D6B4F',
    marginBottom: 2,
  },
  fileSize: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: '#757575',
  },

  // PICK FILE BUTTON
  pickFileButton: {
    backgroundColor: '#2D6B4F',
    borderWidth: 0,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  pickFileButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // SAVE BUTTON CONTAINER
  saveButtonContainer: {
    alignItems: 'center',
    marginTop: 12,
  },

  saveButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 160,
  },

  saveButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
});
