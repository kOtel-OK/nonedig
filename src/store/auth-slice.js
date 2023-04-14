import { createSlice } from '@reduxjs/toolkit';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// For DB Firestore
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithCredential,
} from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  //
  //
  //
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebase);

// Initialize Google Provider
const google = new GoogleAuthProvider();

// Initialize Facebook Provider
const facebook = new FacebookAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase);

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  token: '',
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, actions) {
      state.isLoggedIn = true;
      state.token = actions.payload.token;
      state.currentUser = actions.payload.userData;

      console.log('token: ', state.token, 'ID: ', state.currentUser);
      console.log('User has been signed In');
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = '';
      state.currentUser = null;

      console.log('User has been signed Out');
    },
  },
});

const linkProvidersThunk = (mail, credential) => {
  return dispatch => {
    fetchSignInMethodsForEmail(auth, mail)
      .then(providers => {
        console.log(providers);

        google.setCustomParameters({ login_hint: mail });

        signInWithPopup(auth, google).then(data => {
          const googleCredential =
            GoogleAuthProvider.credentialFromResult(data);

          signInWithCredential(auth, googleCredential).then(data => {
            linkWithCredential(data.user, credential);
            console.log(data.user);
            dispatch(
              authActions.signIn({
                token: data.user.accessToken,
                uid: data.user.uid,
              })
            );
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signUpWithEmailThunk = (
  name,
  email,
  password,
  phone,
  age,
  role
) => {
  return dispatch => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const documentRef = doc(db, 'users', user.uid);

        console.log(user);

        setDoc(documentRef, {
          name,
          age,
          id: user.uid,
          email,
          phone,
          role,
        });

        user.getIdToken().then(token => {
          dispatch(authActions.signIn({ token, uid: user.uid }));
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signInWithEmailThunk = (email, password) => {
  return dispatch => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);

        user.getIdToken().then(token => {
          dispatch(authActions.signIn({ token, uid: user.uid }));
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signInWithGoogleThunk = () => {
  return dispatch => {
    signInWithPopup(auth, google)
      .then(data => {
        let userData;
        const user = data.user;
        const documentRef = doc(db, 'users', user.uid);

        getDoc(documentRef).then(result => {
          if (result.exists()) {
            console.log('User exist: ', result.data());
            userData = result.data();
          } else {
            userData = {
              name: user.displayName,
              age: null,
              id: user.uid,
              email: user.email,
              phone: null,
              role: null,
            };
            setDoc(documentRef, userData);
          }

          user.getIdToken().then(token => {
            dispatch(authActions.signIn({ token, userData }));
          });
        });

        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signInWithFacebookThunk = () => {
  return dispatch => {
    signInWithPopup(auth, facebook)
      .then(data => {
        let userData;
        const user = data.user;
        const documentRef = doc(db, 'users', user.uid);

        getDoc(documentRef).then(result => {
          if (result.exists()) {
            console.log('User exist: ', result.data());
            userData = result.data();
          } else {
            userData = {
              name: user.displayName,
              age: null,
              id: user.uid,
              email: user.email,
              phone: null,
              role: null,
            };
            setDoc(documentRef, userData);
          }

          user.getIdToken().then(token => {
            dispatch(authActions.signIn({ token, userData }));
          });
        });

        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        if (errorCode === 'auth/account-exists-with-different-credential') {
          dispatch(linkProvidersThunk(email, credential));
        } else {
          console.log('errorCode: ', errorCode);
        }
      });
  };
};

export const signOutThunk = () => {
  return dispatch => {
    signOut(auth)
      .then(() => {
        dispatch(authActions.signOut());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
