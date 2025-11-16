/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ProfileScreen from './src/pages/ProfileScreen';
AppRegistry.registerComponent(appName, () => ProfileScreen);
