import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyDatNBfL5TH5EKXL_T17tHKPUT39hDDb7M",
  authDomain: "instagram-clone-c3282.firebaseapp.com",
  projectId: "instagram-clone-c3282",
  storageBucket: "instagram-clone-c3282.appspot.com",
  messagingSenderId: "601059634802",
  appId: "1:601059634802:web:065e391fe46877a6f29ceb"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
