import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';

import {CustomHeader} from '../../components';

const ListDocumentScreen = () => {
  const documents = [
    {
      code: 'B 1234 XYZ',
      imageSource: require('../../assets/image1.png'),
    },
    {
      code: 'D 5678 ABC',
      imageSource: require('../../assets/image1.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <CustomHeader title="List Dokumen" />

      {/* List Dokumen */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {documents.map((doc, index) => (
            <View key={index} style={styles.cardWrapper}>
              <View style={styles.card}>
                <Image
                  source={doc.imageSource}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardInfo}>
                  <View style={styles.iconBox}>
                    <View style={styles.iconLine} />
                    <View style={styles.iconLine} />
                    <View style={styles.iconLine} />
                  </View>
                  <Text style={styles.codeText}>{doc.code}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListDocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    height: 140,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconLine: {
    width: 16,
    height: 2,
    backgroundColor: '#757575',
    marginVertical: 2,
    borderRadius: 1,
  },
  codeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#2A6E54',
    letterSpacing: 0.5,
  },
});
