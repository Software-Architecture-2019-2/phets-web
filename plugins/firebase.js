import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBYDCcObzoVQcs_fxdtJ4k32cCe-IXtUW4',
    authDomain: 'sa-hotdog.firebaseapp.com',
    databaseURL: 'https://sa-hotdog.firebaseio.com',
    projectId: 'sa-hotdog',
    storageBucket: 'sa-hotdog.appspot.com',
    messagingSenderId: '650348011175',
    appId: '1:650348011175:web:8210fbccdfed4363ba8582',
    measurementId: 'G-EW6NZ9394V',
  }
  firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({ timestampsInSnapshots: true })
}
const fireDb = firebase.firestore()
export { fireDb }
