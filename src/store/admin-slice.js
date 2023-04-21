import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const initialState = {
  users: [],
  trips: [],
  drivers: [],
  pages: {
    main: true,
    users: false,
    trips: false,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    changePages(state, actions) {
      state.pages = actions.payload;
    },
    getUsers(state, actions) {
      state.users = actions.payload;
    },
    getTrips(state, actions) {
      state.trips = actions.payload;
      console.log(state.trips);
    },
    getDrivers(state, actions) {
      state.drivers = actions.payload;
    },
  },
});

export const getAllUsersThunk = function () {
  return dispatch => {
    const users = [];
    const usersQuery = query(
      collection(db, 'users'),

      // get all except 'admin'
      where('role', '!=', 'admin')
    );

    getDocs(usersQuery)
      .then(data => {
        data.forEach(el => {
          users.push(el.data());
        });

        dispatch(adminActions.getUsers(users));
        dispatch(
          adminActions.changePages({
            main: false,
            users: true,
            trips: false,
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const editUserRoleThunk = function (uid, role) {
  console.log(uid, role);
  return dispatch => {
    // Find in collection a user which role must be changed
    const userRef = doc(db, 'users', uid);

    getDoc(userRef)
      .then(user => {
        if (user.exists()) {
          // Edit his role
          // Update collection in DB
          setDoc(userRef, { role }, { merge: true }).then(() => {
            dispatch(getAllUsersThunk());
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllTripsThunk = function () {
  return dispatch => {
    const trips = [];
    // get trips from DB
    const tripsQuery = query(collection(db, 'trips'));

    getDocs(tripsQuery)
      .then(data => {
        data.forEach(el => {
          trips.push(el.data());
        });

        dispatch(adminActions.getTrips(trips));
        dispatch(
          adminActions.changePages({
            main: false,
            users: false,
            trips: true,
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createTripThunk = function (trip) {
  return dispatch => {
    const tripRef = doc(collection(db, 'trips'));

    // Add ID field to trip
    trip.id = tripRef.id;

    setDoc(tripRef, trip)
      .then(data => {
        console.log('Trip has been created', data);

        dispatch(getAllTripsThunk());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAvailableDriversThunk = function () {
  return dispatch => {
    const drivers = [];
    const driversQuery = query(
      collection(db, 'users'),
      where('role', '==', 'driver')
    );

    getDocs(driversQuery)
      .then(data => {
        data.forEach(el => drivers.push(el.data()));

        dispatch(adminActions.getDrivers(drivers));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
