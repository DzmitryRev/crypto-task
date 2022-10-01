import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import assets from './slices/assetsSlice';
import portfolio from './slices/portfolioSlice';
import asset from './slices/assetSlise';
import rating from './slices/ratingSlise';

export const store = configureStore({
  reducer: {
    assets,
    asset,
    portfolio,
    rating,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
