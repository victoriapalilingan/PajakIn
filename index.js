import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AddVehicle from './src/pages/AddVehicle';
import App from './App';
import Notification from './src/pages/Notification';
import ProfileScreen from './src/pages/ProfileScreen';
import VehicleDetailScreen from './src/pages/VehicleDetail';
import EditVehicle from './src/pages/EditVehicle';
import SignUp from './src/pages/SignUp';
import {Edit} from 'lucide-react-native';
import ListDocumentScreen from './src/pages/ListDocument';
import UnggahBerkas from './src/pages/AddDocument';

AppRegistry.registerComponent(appName, () => App);
