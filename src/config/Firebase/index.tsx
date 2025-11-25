import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBPwap0Xm_QKQApF3BTi14jGHlrYVs4ODI',
  authDomain: 'pajakin-e2e6b.firebaseapp.com',
  projectId: 'pajakin-e2e6b',
  storageBucket: 'pajakin-e2e6b.firebasestorage.app',
  messagingSenderId: '398445590548',
  appId: '1:398445590548:web:b98366fe09edfb3b054f01',
  databaseURL: 'https://pajakin-e2e6b-default-rtdb.firebaseio.com/', // ✅
};

const app = initializeApp(firebaseConfig);

export default app;
