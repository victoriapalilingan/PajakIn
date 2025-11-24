import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import {HomeHeader, VehicleList, Button, Gap} from '../../components';
import {PlusIcon} from '../../assets';

import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';

const HomeScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [vehicleStats, setVehicleStats] = useState({
    aktif: 0,
    akanJatuhTempo: 0,
    telatBayar: 0,
  });

  const parseDate = raw => {
    if (!raw) return null;

    if (typeof raw === 'number') {
      const d = new Date(raw);
      if (isNaN(d.getTime())) return null;
      d.setHours(0, 0, 0, 0);
      return d;
    }

    if (typeof raw === 'string') {
      if (raw.includes('T') || raw.includes('Z')) {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) {
          d.setHours(0, 0, 0, 0);
          return d;
        }
      }

      let parts;
      if (raw.includes('-')) {
        parts = raw.split('-');
        if (parts[0].length === 4) {
          const d = new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2]),
          );
          if (!isNaN(d.getTime())) {
            d.setHours(0, 0, 0, 0);
            return d;
          }
        } else {
          const d = new Date(
            Number(parts[2]),
            Number(parts[1]) - 1,
            Number(parts[0]),
          );
          if (!isNaN(d.getTime())) {
            d.setHours(0, 0, 0, 0);
            return d;
          }
        }
      } else if (raw.includes('/')) {
        parts = raw.split('/');
        const d = new Date(
          Number(parts[2]),
          Number(parts[1]) - 1,
          Number(parts[0]),
        );
        if (!isNaN(d.getTime())) {
          d.setHours(0, 0, 0, 0);
          return d;
        }
      }

      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        d.setHours(0, 0, 0, 0);
        return d;
      }
    }

    return null;
  };

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }

    const db = getDatabase();

    const userRef = ref(db, `users/${currentUser.uid}`);
    const unsubscribeUser = onValue(userRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        if (data.fullname) {
          setUserName(data.fullname);
        }
        if (data.photo) {
          setUserPhoto(data.photo);
        }
      }
    });

    const vehiclesRef = ref(db, `vehicles/${currentUser.uid}`);
    const unsubscribeVehicles = onValue(vehiclesRef, snapshot => {
      const data = snapshot.val();

      if (!data) {
        setVehicleStats({aktif: 0, akanJatuhTempo: 0, telatBayar: 0});
        return;
      }

      const vehicles = Object.values(data);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let aktif = 0;
      let akanJatuhTempo = 0;
      let telatBayar = 0;

      vehicles.forEach(vehicle => {
        const dueDate = parseDate(vehicle.tanggalJatuhTempo);

        if (!dueDate) {
          aktif += 1;
          return;
        }

        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
          telatBayar += 1;
        } else if (diffDays <= 30) {
          akanJatuhTempo += 1;
        } else {
          aktif += 1;
        }
      });

      setVehicleStats({aktif, akanJatuhTempo, telatBayar});
    });

    return () => {
      unsubscribeUser();
      unsubscribeVehicles();
    };
  }, []);

  const handleAddVehicle = () => {
    navigation.navigate('AddVehicle');
  };

  const handleDetailVehicle = vehicle => {
    if (vehicle && vehicle.id) {
      navigation.navigate('DetailVehicle', {vehicleId: vehicle.id});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Gap height={10} />

        <HomeHeader
          userName={userName}
          userPhoto={userPhoto}
          vehicleStats={vehicleStats}
        />

        <Gap height={12} />

        <VehicleList onPressDetail={handleDetailVehicle} />

        <Gap height={12} />

        <View style={styles.buttonWrapper}>
          <Button
            label="Tambah Kendaraan"
            onPress={handleAddVehicle}
            color="#2A6E54"
            textColor="#FFFFFF"
            width={368}
            height={51}
            iconGap={10}
            iconSize={28}
            leftIcon={<PlusIcon width={28} height={28} color="#FFFFFF" />}
          />
        </View>

        <Gap height={24} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const NAV_HEIGHT_GUESS = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: NAV_HEIGHT_GUESS,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
});
