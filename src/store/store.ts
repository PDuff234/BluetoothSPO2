import logger from 'redux-logger';

import {configureStore} from '@reduxjs/toolkit';
import bluetoothReducer from '../modules/Bluetooth/bluetooth.reducer';
import {useDispatch} from 'react-redux';
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  bluetooth: bluetoothReducer.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(logger)
  },
  devTools: process.env.NODE_ENV === 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();



