import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';

import {CustomHeader} from '../../components';

import {getAuth} from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  remove,
  update,
  push,
  set,
} from 'firebase/database';

interface Document {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  imageBase64: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
}

const ListDocumentScreen = ({navigation}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const db = getDatabase();
    const documentsRef = ref(db, `documents/${currentUser.uid}`);

    const unsubscribe = onValue(
      documentsRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const list: Document[] = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));

          list.sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime(),
          );

          setDocuments(list);
        } else {
          setDocuments([]);
        }
        setLoading(false);
      },
      error => {
        console.log('Error fetching documents:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteDocument = (doc: Document) => {
    Alert.alert(
      'Hapus Dokumen',
      `Apakah Anda yakin ingin menghapus dokumen untuk ${doc.vehiclePlate}?`,
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              const auth = getAuth();
              const uid = auth.currentUser?.uid;
              if (!uid) {
                Alert.alert('Error', 'Silakan login terlebih dahulu');
                return;
              }

              const db = getDatabase();

              // Hapus dari documents collection
              await remove(ref(db, `documents/${uid}/${doc.id}`));

              // Update vehicle: hapus info dokumen
              if (doc.vehicleId) {
                const vehicleRef = ref(db, `vehicles/${uid}/${doc.vehicleId}`);
                await update(vehicleRef, {
                  documentName: null,
                  documentType: null,
                  documentUploadedAt: null,
                  hasDocument: false,
                });
              }

              // Tambahkan notifikasi penghapusan dokumen
              const now = new Date();
              const timestamp = now.getTime();
              const notifRef = push(ref(db, `notifications/${uid}`));
              await set(notifRef, {
                id: notifRef.key,
                type: 'warning',
                title: `Dokumen untuk ${doc.vehiclePlate || '-'} dihapus`,
                subtitle: `Hapus dokumen • ${now.toLocaleString('id-ID')}`,
                timestamp,
                category: 'document-delete',
                read: false,
              });

              Alert.alert('Sukses', 'Dokumen berhasil dihapus');
            } catch (error) {
              console.log('Delete error:', error);
              Alert.alert('Error', 'Gagal menghapus dokumen');
            }
          },
        },
      ],
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Konversi Base64 ke URI untuk Image component
  const getImageSource = (base64: string, fileType: string) => {
    if (!base64) return null;
    const mimeType = fileType || 'image/jpeg';
    return {uri: `data:${mimeType};base64,${base64}`};
  };

  // Loading state
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
