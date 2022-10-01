import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';
import { AssetType } from '../assets.model';

interface IPortfolioSliceState {
  assets: AssetType[],
}

const initialState: IPortfolioSliceState = {
  assets: [],
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolio(state) {
      // get data or push an empty array
      state.assets = [];
    },
    addToPortfolio(state, action) {
      // add to ls
      // reload
      console.log(state, action);
    },
    removeFromPortfolio(state, action) {
      // remove from ls
      // reload
      console.log(state, action);
    },
  },
});

// export const {  } = assetsSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default portfolioSlice.reducer;
