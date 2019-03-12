import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBDjfy2clYYERHPS8xxDR_Jo0jRFcu5Tgc',
  authDomain: 'tp-ssf-postie.firebaseapp.com',
  databaseURL: 'https://tp-ssf-postie.firebaseio.com',
  projectId: 'tp-ssf-postie',
  storageBucket: 'tp-ssf-postie.appspot.com',
  messagingSenderId: '574455414973',
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
