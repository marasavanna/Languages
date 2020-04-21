// Your web app's Firebase configuration
import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyBOsqfSRrXioNMxBUjS5r5_4bql70wOZM8',
  authDomain: 'languages-47896.firebaseapp.com',
  databaseURL: 'https://languages-47896.firebaseio.com',
  projectId: 'languages-47896',
  storageBucket: 'languages-47896.appspot.com',
  messagingSenderId: '492964775472',
  appId: '1:492964775472:web:be4afe9c6b220de7a9cff5',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
