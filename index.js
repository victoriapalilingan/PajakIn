/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './src/pages/HomeScreen';

AppRegistry.registerComponent(appName, () => Home);
