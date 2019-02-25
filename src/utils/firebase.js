import * as app from '@firebase/app'
// Required for side-effects
import "@firebase/firestore";

const config = {
    apiKey: 'AIzaSyBUBSFU6w8cuaDVCTxfvEyGdU19w48EQrA',
    authDomain: 'ncehackathon.firebaseapp.com',
    databaseURL: 'https://ncehackathon.firebaseio.com',
    projectId: 'ncehackathon',
    storageBucket: 'ncehackathon.appspot.com',
    messagingSenderId: '170039911380',
};

app.firebase.initializeApp(config)

export default {
  firestore :app.firebase.firestore()
}