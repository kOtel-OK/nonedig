import { createSlice } from '@reduxjs/toolkit';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  //
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
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = '';
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
