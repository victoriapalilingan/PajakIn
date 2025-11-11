/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignIp from './src/pages/SignIn';

AppRegistry.registerComponent(appName, () => SignIp);
