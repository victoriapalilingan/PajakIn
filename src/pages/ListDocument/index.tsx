import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {CustomHeader, ConfirmationPopup} from '../../components';

import {useDocuments} from '../../hooks/useDocuments';

import {formatDate} from '../../utils/Date';
import {getImageSource} from '../../utils/ImageHelper';

import {showMessage} from 'react-native-flash-message';

const ListDocumentScreen = ({navigation}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const {documents, loading, removeDocument} = useDocuments();

  const handleDeleteDocument = doc => {
    setSelectedDoc(doc);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedDoc) return;

    setDeleteLoading(true);
    try {
      await removeDocument(selectedDoc);

      showMessage({
        message: 'Dokumen berhasil dihapus',
        type: 'success',
      });

      setShowDeleteConfirm(false);
      setSelectedDoc(null);
    } catch (error) {
      console.log('Delete error:', error);

      showMessage({
        message: 'Gagal menghapus dokumen',
        type: 'danger',
      });

      setShowDeleteConfirm(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedDoc(null);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <CustomHeader
          title="List Dokumen"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2A6E54" />
          <Text style={styles.loadingText}>Memuat dokumen...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <CustomHeader
        title="List Dokumen"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {documents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada dokumen</Text>
            <Text style={styles.emptySubText}>
              Unggah dokumen kendaraan Anda untuk menyimpannya di sini.
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {documents.map(doc => {
              const imageSource = getImageSource(doc.imageBase64, doc.fileType);

              return (
                <View key={doc.id} style={styles.cardWrapper}>
                  <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onLongPress={() => handleDeleteDocument(doc)}>
                    {imageSource ? (
                      <Image
                        source={imageSource}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No Image</Text>
                      </View>
                    )}

                    <View style={styles.cardInfo}>
                      <View style={styles.iconBox}>
                        <View style={styles.iconLine} />
                        <View style={styles.iconLine} />
                        <View style={styles.iconLine} />
                      </View>
                      <View style={styles.textInfo}>
                        <Text style={styles.codeText}>{doc.vehiclePlate}</Text>
                        <Text style={styles.dateText}>
                          Diunggah: {formatDate(doc.uploadedAt)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {documents.length > 0 && (
          <Text style={styles.hintText}>
            Tekan lama pada dokumen untuk menghapus
          </Text>
        )}
      </ScrollView>

      <ConfirmationPopup
        visible={showDeleteConfirm}
        onClose={cancelDelete}
        title="Hapus Dokumen"
        message={`Apakah Anda yakin ingin menghapus dokumen untuk ${selectedDoc?.vehiclePlate}?`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteLoading}
        confirmButtonColor="#E53935"
        cancelButtonColor="#9E9E9E"
      />
    </SafeAreaView>
  );
};

export default ListDocumentScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E8F5E9'},
  centerContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#2A6E54',
  },
  scrollView: {flex: 1},
  scrollContent: {paddingBottom: 20},
  emptyContainer: {
    marginHorizontal: 24,
    marginTop: 40,
    backgroundColor: '#FFF',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },
  emptyText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#2A6E54',
    marginBottom: 8,
  },
  emptySubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardWrapper: {marginBottom: 16},
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  placeholderImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconLine: {
    width: 18,
    height: 2,
    backgroundColor: '#2A6E54',
    marginVertical: 2,
    borderRadius: 1,
  },
  textInfo: {flex: 1},
  codeText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#2A6E54',
    letterSpacing: 0.5,
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
  hintText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
});
