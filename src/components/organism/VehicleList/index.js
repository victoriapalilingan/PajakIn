import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import VehicleCard from '../../molecules/VehicleCard';
import colors from '../../../styles/colors';
import Gap from '../../atoms/Gap';

import {MotorIcon, MobilIcon} from '../../../assets';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';

const VehicleList = ({onPressDetail}) => {
  const [vehicles, setVehicles] = useState([]);

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

  const calculateStatus = (tanggalJatuhTempo, today) => {
    const activeResult = {
      label: 'Aktif',
      color: colors.badgeActive || '#E8F5E9',
      textColor: colors.primary || '#2A6E54',
      daysInfo: null,
    };

    const dueDate = parseDate(tanggalJatuhTempo);
    if (!dueDate) {
      return activeResult;
    }

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      const lateDays = Math.abs(diffDays);
      return {
        label: 'Telat Bayar',
        color: colors.badgeLate || '#FFEBEE',
        textColor: colors.red2 || '#E53935',
        daysInfo: `Telat Bayar ${lateDays} Hari`,
      };
    }

    if (diffDays === 0) {
      return {
        label: 'Akan Jatuh Tempo',
        color: colors.badgeWarning || '#FFF8E1',
        textColor: colors.yellow2 || '#F9A825',
        daysInfo: 'Jatuh Tempo Hari Ini',
      };
    }

    if (diffDays <= 30) {
      return {
        label: 'Akan Jatuh Tempo',
        color: colors.badgeWarning || '#FFF8E1',
        textColor: colors.yellow2 || '#F9A825',
        daysInfo: `Akan Jatuh Tempo ${diffDays} Hari`,
      };
    }

    return activeResult;
  };

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const db = getDatabase();
    const vehiclesRef = ref(db, `vehicles/${currentUser.uid}`);

    const unsubscribe = onValue(vehiclesRef, snapshot => {
      const data = snapshot.val();
      console.log('Raw Firebase data:', data);

      if (!data) {
        setVehicles([]);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const list = Object.keys(data).map(key => {
        const vehicle = data[key];
        const statusInfo = calculateStatus(vehicle.tanggalJatuhTempo, today);

        return {
          id: key,
          ...vehicle,
          statusLabel: statusInfo.label,
          statusColor: statusInfo.color,
          statusTextColor: statusInfo.textColor,
          daysInfo: statusInfo.daysInfo,
        };
      });

      list.sort((a, b) => {
        const priority = {
          'Telat Bayar': 0,
          'Akan Jatuh Tempo': 1,
          Aktif: 2,
        };
        return (priority[a.statusLabel] || 2) - (priority[b.statusLabel] || 2);
      });

      console.log('Final vehicle list:', list);
      setVehicles(list);
    });

    return () => unsubscribe();
  }, []);

  const renderIcon = jenis => {
    if (jenis === 'mobil') return MobilIcon;
    if (jenis === 'motor') return MotorIcon;
    return MobilIcon;
  };

  const handlePressForward = vehicle => {
    if (onPressDetail && vehicle.id) {
      onPressDetail(vehicle);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kendaraan Anda</Text>

      {vehicles.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada kendaraan</Text>
          <Text style={styles.emptySubText}>
            Tambahkan kendaraan Anda untuk mulai memantau pajak.
          </Text>
        </View>
      )}

      <View style={styles.listContainer}>
        {vehicles.map((v, i) => (
          <React.Fragment key={v.id}>
            <VehicleCard
              plate={v.noPolisi || v.plate}
              Icon={renderIcon(v.jenisKendaraan)}
              status={v.statusLabel}
              statusColor={v.statusColor}
              statusTextColor={v.statusTextColor}
              statusText={v.daysInfo}
              onPressForward={() => handlePressForward(v)}
            />
            {i !== vehicles.length - 1 && <Gap height={9} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  listContainer: {
    marginBottom: 12,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#2A6E54',
  },
  emptySubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
});
