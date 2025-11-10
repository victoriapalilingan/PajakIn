/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AddVehicle from './src/pages/AddVehicle';
import EditVehicle from './src/pages/EditVehicle';

AppRegistry.registerComponent(appName, () => EditVehicle);
