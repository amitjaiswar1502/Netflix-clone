
import  { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCMhDEZzRpd51KMFKAuCL5luYKvhSf940I",
  authDomain: "netflix-clone-5980b.firebaseapp.com",
  projectId: "netflix-clone-5980b",
  storageBucket: "netflix-clone-5980b.appspot.com",
  messagingSenderId: "753006842049",
  appId: "1:753006842049:web:7adab3fb459e94b2f88440"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {auth};
export {db};
export default app;

