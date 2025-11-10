import {AppRegistry} from 'react-native';
import HistoryScreen from './src/pages/HistoryScreen';
import {name as appName} from './app.json';
import HomeScreen from './src/pages/HomeScreen';

AppRegistry.registerComponent(appName, () => HomeScreen);
