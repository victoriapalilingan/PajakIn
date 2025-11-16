import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GoBackIcon from '../../../assets/goback.svg';

const CustomHeader = ({title, onBackPress, titleSize = 27}) => {
  return (
    <View style={styles.header}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <GoBackIcon width={40} height={61} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <Text
        style={[styles.headerTitle, {fontSize: titleSize}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
      </Text>

      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#26634C',
    height: 135,
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
    marginLeft: 15,
  },

  headerTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    color: '#FEB800',
    textAlign: 'center',
  },

  rightSpacer: {
    width: 70,
  },
});

export default CustomHeader;
