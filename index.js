/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignUp from './src/pages/SignUp';
import AddVehicle from '../src/pages/AddVehicle';

AppRegistry.registerComponent(appName, () => AddVehicle);
