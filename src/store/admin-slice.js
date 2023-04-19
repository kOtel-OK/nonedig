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
  addDoc,
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

    getDocs(usersQuery).then(data => {
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
    });
  };
};

export const editUserRoleThunk = function (uid, role) {
  console.log(uid, role);
  return dispatch => {
    // Find in collection a user which role must be changed
    const userRef = doc(db, 'users', uid);

    getDoc(userRef).then(user => {
      if (user.exists()) {
        // Edit his role
        // Update collection in DB
        setDoc(userRef, { role }, { merge: true }).then(() => {
          dispatch(getAllUsersThunk());
        });
      }
    });
  };
};

export const getAllTripsThunk = function () {
  return dispatch => {
    const trips = [];
    // get trips from DB
    const tripsQuery = query(collection(db, 'trips'));

    getDocs(tripsQuery).then(data => {
      data.forEach(el => {
        trips.push(el.data());
      });

      console.log(trips);

      dispatch(adminActions.getTrips(trips));
      dispatch(
        adminActions.changePages({
          main: false,
          users: false,
          trips: true,
        })
      );
    });
    // update state
  };
};

export const createTripThunk = function (trip) {
  return dispatch => {
    console.log('Create trip: ', trip);

    const tripRef = collection(db, 'trips');
    addDoc(tripRef, trip).then(data => {
      console.log('Trip has been created', data);

      dispatch(getAllTripsThunk());
    });

    // create new trip
    // update DB with new trip
    // get all trips with getAllTripsThunk
    // update state
    // update UI
  };
};

export const getAvailableDriversThunk = function () {
  return dispatch => {
    const drivers = [];
    const driversQuery = query(
      collection(db, 'users'),
      where('role', '==', 'driver')
    );

    getDocs(driversQuery).then(data => {
      data.forEach(el => drivers.push(el.data()));

      dispatch(adminActions.getDrivers(drivers));
    });
  };
};

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
