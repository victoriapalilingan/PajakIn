// components/organisms/DocumentList.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import DocumentCard from '../molecules/DocumentCard';

const DocumentList = ({documents, onItemPress}) => {
  return (
    <View style={styles.listContainer}>
      {documents.map((doc, index) => (
        <DocumentCard
          key={index}
          code={doc.code}
          imageSource={doc.imageSource}
          onPress={() => onItemPress(doc.code)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default DocumentList;
