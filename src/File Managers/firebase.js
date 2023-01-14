 import { initializeApp } from "firebase/app";

    import { getStorage} from "firebase/storage";
  

  const firebaseConfig = {
    apiKey: "AIzaSyBW8F1RT2gsGJ_9vyMp3eK28C1fzw-bUMM",
    authDomain: "filemanagers-cdac0.firebaseapp.com",
    projectId: "filemanagers-cdac0",
    storageBucket: "filemanagers-cdac0.appspot.com",
    messagingSenderId: "86203596599",
    appId: "1:86203596599:web:fa5a76894569c60507a4b2"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app);



 // Import the functions you need from the SDKs you need
// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getFirestore} from 'firebase/firestore';
// import {getStorage} from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
// const db = getFirestore();
// const storage = getStorage();
// export {app,db,storage}