import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';

import SplashScreen from './src/pages/SplashScreen';
import OnBoarding from './src/pages/onBoarding';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import AddVehicle from './src/pages/AddVehicle';
import VehicleDetailScreen from './src/pages/VehicleDetail';
import EditVehicle from './src/pages/EditVehicle';
import ListDocumentScreen from './src/pages/ListDocument';
import Notification from './src/pages/Notification';
import UnggahBerkas from './src/pages/AddDocument';

import BottomNavigation from './src/components/organism/BottomNavigation';

// icons active/inactive
import HomeActive from './src/assets/HomeActive.svg';
import HomeInactive from './src/assets/HomeInactive.svg';

import DocActive from './src/assets/DocActive.svg';
import DocInactive from './src/assets/DocInactive.svg';

import BellActive from './src/assets/BellActive.svg';
import BellInactive from './src/assets/BellInactive.svg';

import UserActive from './src/assets/UserActive.svg';
import UserInactive from './src/assets/UserInactive.svg';

import ButtonPlus from './src/assets/ButtonAdd1.svg';

const Stack = createNativeStackNavigator();
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

const Placeholder = ({title}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>{title}</Text>
  </View>
);

const ProfileScreen = () => <Placeholder title="Profil" />;

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

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="Main" component={MainTabs} />

      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      <Stack.Screen name="AddDocument" component={UnggahBerkas} />
      <Stack.Screen name="DetailVehicle" component={VehicleDetailScreen} />
      <Stack.Screen name="EditVehicle" component={EditVehicle} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
