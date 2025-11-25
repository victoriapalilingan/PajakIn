import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {NotificationCard, CustomHeader, Gap} from '../../components';
import {useNotifications} from '../../hooks/useNotifications';

const {width: screenWidth} = Dimensions.get('window');
const Card = NotificationCard;

const Notification = () => {
  const horizontalPadding = (screenWidth - 318) / 2;

  const {notifications, loading, error} = useNotifications();

  if (loading) {
    return (
      <View style={styles.fullScreenContainer}>
        <CustomHeader title="Notifikasi" alignLeft />
        <Gap height={24} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2D6A4F" />
          <Text style={styles.loadingText}>Memuat notifikasi...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <CustomHeader title="Notifikasi" alignLeft />
      <Gap height={24} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingHorizontal: horizontalPadding},
        ]}
        showsVerticalScrollIndicator={false}>
        {error ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{error}</Text>
          </View>
        ) : notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada notifikasi</Text>
          </View>
        ) : (
          notifications.map((item, index) => (
            <Card
              key={item.id || index}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))
        )}

        <View style={styles.scrollSpacer} />
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F1FEF0',
  },
  content: {
    paddingTop: 24,
    paddingBottom: 40,
    zIndex: 0,
  },
  scrollSpacer: {
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#2A6E53',
    fontFamily: 'Montserrat-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#8D92A3',
    fontFamily: 'Montserrat-Medium',
  },
});
