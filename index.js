/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import onBoarding1 from './src/pages/onBoarding';

AppRegistry.registerComponent(appName, () => onBoarding1);
