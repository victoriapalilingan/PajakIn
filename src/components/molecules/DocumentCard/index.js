import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GoBackIcon from '../../../assets/goback.svg';

const CustomHeader = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
      {/* Back button hanya muncul jika onBackPress ada */}
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <GoBackIcon width={55} height={55} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} /> // placeholder, supaya title tetap center
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#26634C',
    paddingTop: 46,
    paddingBottom: 22,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  backButton: {
    width: 70,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1,
    marginLeft: 15,
  },

  headerTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    fontWeight: '700',
    color: '#FEB800',
    textAlign: 'center',
    flex: 1,
  },

  rightSpacer: {width: 70}, // supaya title tetap simetris
});

export default CustomHeader;
