import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// doc is a function that takes a reference to a document and returns a document snapshot object
// getDoc is a function that takes a reference to a document and returns a promise that resolves with a document snapshot object
// setDoc is a function that takes a reference to a document and returns a promise that resolves with a document snapshot object
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: 'AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk',
//   authDomain: 'crwn-clothing-db-98d4d.firebaseapp.com',
//   projectId: 'crwn-clothing-db-98d4d',
//   storageBucket: 'crwn-clothing-db-98d4d.appspot.com',
//   messagingSenderId: '626766232035',
//   appId: '1:626766232035:web:506621582dab103a4d08d6',
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmLdtD1tIWmHMhhtnXY8vJhthe4yTgtno",
  authDomain: "crwn-clothing-db-fbeab.firebaseapp.com",
  projectId: "crwn-clothing-db-fbeab",
  storageBucket: "crwn-clothing-db-fbeab.appspot.com",
  messagingSenderId: "106928658374",
  appId: "1:106928658374:web:84de7d55b2815de48f44c7",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  } else {
    console.log("User already exists");
  }

  return userDocRef;
};
