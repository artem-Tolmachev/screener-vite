import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { coinsApi } from '@/pages/dashboard/coinData/services/getApiCoins';
import { coins } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import {ordersBookSlice} from '@/pages/ordersBookPage/ordesData/slices/slicesOrdersBook';
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {UserSlice} from '@/pages/dashboard/coinData/slices/UserSlice';
import {HeatMapSlice} from '@/pages/heat-map/heapMapData/slices/HeatMapSlice';

const rootReducer = combineReducers({
  [coinsApi.reducerPath]: coinsApi.reducer,
  coins: coins.reducer,
  ordersBook: ordersBookSlice.reducer,
  user: UserSlice.reducer,
  heatMap: HeatMapSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [coinsApi.reducerPath, 'coins', 'ordersBook', 'user', 'heatMap'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // отключаем предупреждения redux-persist
    }).concat(coinsApi.middleware),

})
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 

setupListeners(store.dispatch)
// console.log(store.dispatch)
// console.log(store.dispatch(coinsApi.endpoints.getCoins.initiate()))