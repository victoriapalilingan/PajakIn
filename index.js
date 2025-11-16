import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AddVehicle from './src/pages/AddVehicle';
import App from './App';
import Notification from './src/pages/Notification';
import ProfileScreen from './src/pages/ProfileScreen';
import VehicleDetailScreen from './src/pages/VehicleDetail';
import EditVehicle from './src/pages/EditVehicle';

AppRegistry.registerComponent(appName, () => App);
