import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import all reducers
import alertReducer from './slices/alertSlice';
import getResponseReducer from './slices/getResponseSlice';
import userReducer from './slices/userSlice';
import activityIndicatorReducer from './slices/activityIndicatorSlice';
import paramsReducer from './slices/paramsSlice';

// Configure persist for getResponse
const getResponsePersistConfig = {
  key: 'getResponse',
  storage: AsyncStorage,
  whitelist: ['getResponse'], // only getResponse will be persisted
};

// Root reducer
const rootReducer = combineReducers({
  alert: alertReducer,
  activityIndicator: activityIndicatorReducer,
  getResponse: persistReducer(getResponsePersistConfig, getResponseReducer),
  params: paramsReducer,
  user: userReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 