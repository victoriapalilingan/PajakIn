/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Notification from './src/pages/Notification';
AppRegistry.registerComponent(appName, () => Notification);
