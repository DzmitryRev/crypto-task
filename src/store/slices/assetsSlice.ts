import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IAssetsSliceState {
  value: number
}

const initialState: IAssetsSliceState = {
  value: 0,
};

export const assetsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = assetsSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default assetsSlice.reducer;
