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
  trips: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getUsers(state, actions) {
      state.users = actions.payload;
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

      dispatch(userActions.getUsers(users));
    });
  };
};

export const editUserRoleThunk = function (uid, role) {
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

export const userActions = adminSlice.actions;
export default adminSlice.reducer;
