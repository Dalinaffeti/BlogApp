import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCID0JGe60WUn_Mz4DRbFqA1Z68NgOyx00",
  authDomain: "blogapp-7a0c8.firebaseapp.com",
  projectId: "blogapp-7a0c8",
  storageBucket: "blogapp-7a0c8.appspot.com",
  messagingSenderId: "313113952871",
  appId: "1:313113952871:web:9110535308d4cdf2b60ac2",
  // measurementId: "G-HGTMQ51BGN"
};
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{storage,db,firebaseApp,provider, firebase as default};