import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../pages/HomeScreen';
import ListDocumentScreen from '../pages/ListDocument';
import Notification from '../pages/Notification';
import ProfileScreen from '../pages/ProfileScreen';

import BottomNavigation from '../components/organism/BottomNavigation';
import ButtonPlus from '../assets/ButtonAdd1.svg';

import HomeActive from '../assets/HomeActive.svg';
import HomeInactive from '../assets/HomeInactive.svg';
import DocActive from '../assets/DocActive.svg';
import DocInactive from '../assets/DocInactive.svg';
import BellActive from '../assets/BellActive.svg';
import BellInactive from '../assets/BellInactive.svg';
import UserActive from '../assets/UserActive.svg';
import UserInactive from '../assets/UserInactive.svg';

const Tab = createBottomTabNavigator();

// CONFIG = “desain” level organism, bukan di App
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
