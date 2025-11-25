import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../pages/HomeScreen';
import ListDocumentScreen from '../pages/ListDocument';
import Notification from '../pages/Notification';
import ProfileScreen from '../pages/ProfileScreen';

import {BottomNavigation} from '../components';

import {
  ButtonPlus,
  HomeActive,
  HomeInactive,
  DocActive,
  DocInactive,
  BellActive,
  BellInactive,
  UserActive,
  UserInactive,
} from '../assets';

const Tab = createBottomTabNavigator();

const TAB_ITEMS = [
  {
    key: 'home',
    label: 'Home',
    activeIcon: HomeActive,
    inactiveIcon: HomeInactive,
  },
  {
    key: 'dokumen',
    label: 'Dokumen',
    activeIcon: DocActive,
    inactiveIcon: DocInactive,
  },
  {
    key: 'notifikasi',
    label: 'Notifikasi',
    activeIcon: BellActive,
    inactiveIcon: BellInactive,
  },
  {
    key: 'profil',
    label: 'Profil',
    activeIcon: UserActive,
    inactiveIcon: UserInactive,
  },
];

const CustomTabBar = ({state, navigation}) => {
  const activeKey = state.routes[state.index].name;

  const handleTabPress = key => {
    navigation.navigate(key);
  };

  const handleAddPress = () => {
    navigation.navigate('AddVehicle');
  };

  return (
    <BottomNavigation
      items={TAB_ITEMS}
      activeKey={activeKey}
      onTabPress={handleTabPress}
      onAddPress={handleAddPress}
      fabIcon={ButtonPlus}
    />
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen name="home" component={HomeScreen} />
    <Tab.Screen name="dokumen" component={ListDocumentScreen} />
    <Tab.Screen name="notifikasi" component={Notification} />
    <Tab.Screen name="profil" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabs;
