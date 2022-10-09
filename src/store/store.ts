import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import portfolio from './slices/portfolioSlice';
// import rating from './slices/ratingSlise';
import assetsApi from './api/AssetsApi';
// import assets from './slices/assetsSlice';
// import asset from './slices/assetSlise';

export const store = configureStore({
  reducer: {
    // assets,
    // asset,
    portfolio,
    // rating,
    [assetsApi.reducerPath]: assetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(assetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
