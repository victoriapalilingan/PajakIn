import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import screens
import SplashScreen from './src/pages/SplashScreen';
import OnBoarding from './src/pages/onBoarding';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import AddVehicle from './src/pages/AddVehicle';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
