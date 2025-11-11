/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignUp from './src/pages/SignUp';
import SplashScreen from './src/pages/SplashScreen';

AppRegistry.registerComponent(appName, () => SplashScreen);
