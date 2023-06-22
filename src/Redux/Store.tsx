import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ShoesSlice from './ShoesSlice';
const rootReducer = combineReducers({
  ShoesSlice: ShoesSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const pReducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({
  reducer: pReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof Store.getState>;
export default Store;
export const persistor = persistStore(Store);
