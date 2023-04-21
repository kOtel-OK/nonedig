import { createSlice } from '@reduxjs/toolkit';
import { firebase, db } from '../firebase';
import { adminActions } from './admin-slice';

// For DB Firestore
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
} from 'firebase/firestore';
import {
  getAuth,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithCredential,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebase);
// Set locale
auth.useDeviceLanguage();
// Initialize Google Provider
const google = new GoogleAuthProvider();
// Initialize Facebook Provider
const facebook = new FacebookAuthProvider();

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  authMode: 'signIn',
  token: '',
  currentUser: null,
  isModalOpen: false,
  captchaStatus: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, actions) {
      const user = actions.payload.userData;
      state.isLoggedIn = true;

      if (user?.role === 'admin') {
        state.isAdmin = true;
      }

      state.token = actions.payload.token;

      console.log('user: ', user);
      state.currentUser = user;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.token = '';
      state.currentUser = null;

      console.log('The user is logged out');
    },
    changeAuthMode(state, actions) {
      if (actions.payload === 'signIn') {
        state.authMode = 'signIn';
      } else if (actions.payload === 'signUp') {
        state.authMode = 'signUp';
      }
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    changeCaptchaStatus(state, actions) {
      state.captchaStatus = actions.payload;
    },
  },
});

const linkProvidersThunk = (mail, credential) => {
  return dispatch => {
    fetchSignInMethodsForEmail(auth, mail)
      .then(providers => {
        // An array of available providers
        const provider = providers[0];

        if (provider === 'password') {
          // get credentials or password
          // TODO
          // Add pop up window for password
          const userProvidedPassword = prompt('Please type your password');

          signInWithEmailAndPassword(auth, mail, userProvidedPassword).then(
            userCredential => {
              linkWithCredential(userCredential.user, credential);
              dispatch(
                authActions.signIn({
                  token: userCredential.user.accessToken,
                  uid: userCredential.user.uid,
                })
              );
            }
          );
        } else if (provider === 'google.com') {
          google.setCustomParameters({ login_hint: mail });

          signInWithPopup(auth, google).then(data => {
            const googleCredential =
              GoogleAuthProvider.credentialFromResult(data);
            signInWithCredential(auth, googleCredential).then(data => {
              linkWithCredential(data.user, credential);
              dispatch(
                authActions.signIn({
                  token: data.user.accessToken,
                  uid: data.user.uid,
                })
              );
            });
          });
        } else {
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signUpWithEmailThunk = (name, email, password, phone, age) => {
  return dispatch => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const documentRef = doc(db, 'users', user.uid);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log('Check your email for verified');

          setDoc(documentRef, {
            name,
            age,
            id: user.uid,
            email,
            phone,
            role: 'passenger',
          });
          dispatch(authActions.openModal());
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

        // If user has verefied his mail - log in
        if (user.emailVerified) {
          const documentRef = doc(db, 'users', user.uid);
          getDoc(documentRef).then(result => {
            user.getIdToken().then(token => {
              dispatch(authActions.signIn({ token, userData: result.data() }));
            });
          });
        } else {
          throw new Error('Email is not verified!');
        }
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
              role: 'passenger',
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
              role: 'passenger',
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

export const enableCaptchaThunk = () => {
  return dispatch => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: token => {
          // console.log(token);
        },
        'expired-callback': () => {
          console.log('expired');
        },
        'error-callback': error => {
          console.log(error);
        },
      },
      auth
    );
  };
};

export const signInWithPhoneThunk = phoneNumber => {
  return dispatch => {
    dispatch(authActions.changeCaptchaStatus(true));

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        console.log('SMS SENT!');
        window.confirmationResult = confirmationResult;
      })
      .catch(error => {
        console.log(error, 'SMS not sent');
      });
  };
};

export const confirmPhoneNumberThunk = confirmCode => {
  return dispatch => {
    window.confirmationResult
      .confirm(confirmCode)
      .then(function (result) {
        // User has been verified
        // Close window
        dispatch(authActions.closeModal());
        const user = result.user;
        let userData;

        // Get ref to doc by ID
        const documentUidRef = doc(db, 'users', user.uid);
        // Get ref to doc by phone field
        // TODO
        // Check user in DB by phone number
        const documentPhoneRef = query(
          collection(db, 'users'),
          where('phone', '==', user.phoneNumber)
        );

        getDoc(documentUidRef).then(result => {
          if (result.exists()) {
            console.log('User exist: ', result.data());
            userData = result.data();
          } else {
            userData = {
              name: null,
              age: null,
              id: user.uid,
              email: null,
              phone: user.phoneNumber,
              role: 'passenger',
            };
            setDoc(documentUidRef, userData);
          }

          user.getIdToken().then(token => {
            dispatch(authActions.signIn({ token, userData }));
          });
        });
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
        dispatch(
          adminActions.changePages({
            main: true,
            users: false,
            trips: false,
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
