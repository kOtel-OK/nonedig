import { createSlice } from '@reduxjs/toolkit';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase);

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpWithEmail() {},
    signIn(state, actions) {
      state.isLoggedIn = true;
      state.token = actions.payload;

      console.log('User has been signed In');
      console.log(state.token);
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = '';

      console.log('User has been signed Out');
      console.log(state.token);
    },
  },
});

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
        // Signed in
        const user = userCredential.user;
        console.log(user);

        setDoc(doc(db, 'users', user.uid), {
          name,
          age,
          id: user.uid,
          email,
          phone,
          role,
        });

        user.getIdToken().then(token => {
          dispatch(authActions.signIn(token));
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

export const signInWithEmailThunk = (email, password) => {
  return dispatch => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        user.getIdToken().then(token => {
          dispatch(authActions.signIn(token));
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

export const signInWithGoogleThunk = () => {
  return dispatch => {
    signInWithPopup(auth, google)
      .then(result => {
        const user = result.user;
        // Connect to DB and check uid or email if the user exist
        getDoc(doc(db, 'users', user.uid)).then(result => {
          // If yes
          if (result.id === user.uid) {
            console.log('User exist!');
          } else {
            // If no - add user to DB
            setDoc(doc(db, 'users', user.uid), {
              name: user.displayName,
              age: null,
              id: user.uid,
              email: user.email,
              phone: null,
              role: null,
            });
          }

          user.getIdToken().then(token => {
            dispatch(authActions.signIn(token));
          });
        });

        console.log(user);
      })
      .catch(error => {
        console.log(error);
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
