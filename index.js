/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/HomeScreen';
import HomeScreen from './src/pages/HomeScreen';

AppRegistry.registerComponent(appName, () => HomeScreen);
