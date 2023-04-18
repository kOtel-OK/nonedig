import { createSlice } from '@reduxjs/toolkit';
import { firebase, db } from '../firebase';

// For DB Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithCredential,
  sendEmailVerification,
} from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebase);

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
      state.token = '';
      state.currentUser = null;

      console.log('User has been signed Out');
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
  },
});

const linkProvidersThunk = (mail, credential) => {
  return dispatch => {
    fetchSignInMethodsForEmail(auth, mail)
      .then(providers => {
        console.log(providers);
        const provider = providers[0];

        if (provider === 'password') {
          // get credentials or password
          console.log(auth.currentUser);
          const userProvidedPassword = prompt('Please type your password');
          console.log(userProvidedPassword);
          console.log(auth.currentUser);

          signInWithEmailAndPassword(auth, mail, userProvidedPassword).then(
            userCredential => {
              console.log(userCredential);
              // signInWithCredential(auth, userCredential).then(data => {
              linkWithCredential(userCredential.user, credential);
              console.log(userCredential.user);
              dispatch(
                authActions.signIn({
                  token: userCredential.user.accessToken,
                  uid: userCredential.user.uid,
                })
              );
              // });
            }
          );
        } else if (provider === 'google.com') {
          google.setCustomParameters({ login_hint: mail });

          signInWithPopup(auth, google).then(data => {
            const googleCredential =
              GoogleAuthProvider.credentialFromResult(data);
            console.log(googleCredential);
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
        } else {
        }
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

        sendEmailVerification(auth.currentUser).then(() => {
          console.log('Check your email for verified');

          setDoc(documentRef, {
            name,
            age,
            id: user.uid,
            email,
            phone,
            role,
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

// const calculateTimetoLogOut = timeToLogout => {
//   const currentTime = new Date().getTime();

//   const experationLogoutTime = !timeToLogout
//     ? +localStorage.getItem('experationLogoutTime')
//     : currentTime + +timeToLogout * 1000;

//   const remainingTime = experationLogoutTime - currentTime;

//   localStorage.setItem('experationLogoutTime', experationLogoutTime);

//   // Value for Timer
//   return remainingTime;
// };

// const initialState = {
//   isLoggedIn: false,
//   token: '',
//   isModalOpen: false,
//   authOption: 'signIn',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     sign(state, actions) {
//       state.token = actions.payload.token;

//       if (actions.payload.authOption === 'signIn') {
//         state.isLoggedIn = true;
//       }
//     },
//     logOut(state) {
//       state.isLoggedIn = false;
//       state.token = '';
//       state.timeToLogOut = '';
//     },
//     openModal(state) {
//       state.isModalOpen = true;
//     },
//     closeModal(state) {
//       state.isModalOpen = false;
//     },
//     authOptionhandler(state, actions) {
//       state.authOption = actions.payload;
//     },
//   },
// });

// // Санка
// export const autoLogoutThunk = timeToLogout => {
//   return dispatch => {
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('experationLogoutTime');

//       dispatch(authActions.logOut());
//     }, calculateTimetoLogOut(timeToLogout));
//   };
// };

// // Санка
// export const authRequestThunk = requestData => {
//   return dispatch => {
//     fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:${
//         requestData.authOption === 'signIn' ? 'signInWithPassword' : 'signUp'
//       }?key=AIzaSyBzFo98u2vRpiRpVjwPqrLrGhi511hD_S0`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: requestData.enteredEmail,
//           password: requestData.enteredPassword,
//           returnSecureToken: true,
//         }),
//       }
//     )
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           return response.json().then(data => {
//             throw new Error(data.error?.message || 'Something went wrong');
//           });
//         }
//       })
//       .then(data => {
//         console.log(data);

//         localStorage.setItem('token', data.idToken);

//         dispatch(
//           authActions.sign({
//             token: data.idToken,
//             authOption: requestData.authOption,
//           })
//         );

//         dispatch(autoLogoutThunk(data.expiresIn));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// };

export const authActions = authSlice.actions;
export default authSlice.reducer;
