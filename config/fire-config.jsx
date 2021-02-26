import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCsX682q7x5vofATP7yLetb3deVJpGloRo',
  authDomain: 'oneitem-7ba51.firebaseapp.com',
  projectId: 'oneitem-7ba51',
  storageBucket: 'oneitem-7ba51.appspot.com',
  messagingSenderId: '140079528981',
  appId: '1:140079528981:web:dd7acfc56e2baf232ca21c',
  measurementId: 'G-5NGZJY7BQR',
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;
const storage = firebase.storage();

export {
  storage, fire as default,
};
