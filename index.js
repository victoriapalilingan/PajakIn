/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AddVehicle from './src/pages/AddVehicle';
import EditVehicle from './src/pages/EditVehicle';
import VehicleDetail from './src/pages/VehicleDetail';
import UnggahBerkas from './src/pages/AddDocument';

AppRegistry.registerComponent(appName, () => UnggahBerkas);
