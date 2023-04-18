import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import userSlice from './user-slice';
import adminSlice from './admin-slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    admin: adminSlice,
  },
});

export default store;
