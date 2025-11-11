import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AddVehicle from './src/pages/AddVehicle';
import EditVehicle from './src/pages/EditVehicle';
import VehicleDetail from './src/pages/VehicleDetail';

AppRegistry.registerComponent(appName, () => VehicleDetail);
