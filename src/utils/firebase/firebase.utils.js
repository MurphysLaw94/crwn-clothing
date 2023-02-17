import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-W9hCmh0zgpP98WZnCEIyo5PBzo9AGHg",
  authDomain: "crwn-clothing-db-c6113.firebaseapp.com",
  projectId: "crwn-clothing-db-c6113",
  storageBucket: "crwn-clothing-db-c6113.appspot.com",
  messagingSenderId: "719531079297",
  appId: "1:719531079297:web:b7fb87e889c68c59737f80"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        }   catch (error) {
            console.log('error creating the user ', error.message);
        }
    }

    return userDocRef;

};
