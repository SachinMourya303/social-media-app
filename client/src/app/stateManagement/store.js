import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slice/authSlice';
import usersReducer from './slice/usersSlice';

const authPersistConfig = {
  key: 'userAuth',
  storage,
  whitelist: ['userToken', 'userDetails' , 'darkmode'],
};

const rootReducer = combineReducers({
  userAuth: persistReducer(authPersistConfig, authReducer),
  users: usersReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
