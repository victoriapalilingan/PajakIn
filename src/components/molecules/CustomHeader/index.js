import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import GoBackIcon from '../../../assets/goback.svg';

const CustomHeader = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <GoBackIcon width={55} height={55} />
      </TouchableOpacity>

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
  },

  rightSpacer: {flex: 1},
});

export default CustomHeader;
