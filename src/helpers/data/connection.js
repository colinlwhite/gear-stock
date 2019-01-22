import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../apiKeys';

const firebaseApp = () => {
  console.log(apiKeys);
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
};

export default firebaseApp;
