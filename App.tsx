import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './src/pages/SplashScreen';
import OnBoarding from './src/pages/onBoarding';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import AddVehicle from './src/pages/AddVehicle';
import VehicleDetailScreen from './src/pages/VehicleDetail';
import EditVehicle from './src/pages/EditVehicle';
import UnggahBerkas from './src/pages/AddDocument';

import MainTabs from './src/navigation/MainTabs';

import FlashMessage from 'react-native-flash-message';

import './src/config/Firebase';

const Stack = createNativeStackNavigator();

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
    <FlashMessage position="top" />
  </NavigationContainer>
);

export default App;
