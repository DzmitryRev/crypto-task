import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AssetResponseType, AssetType } from '../assets.model';

interface IPortfolioSliceState {
  assets: AssetType[];
}

const initialState: IPortfolioSliceState = {
  assets: [],
};

export const fetchPortfolioAsset = createAsyncThunk(
  'asset/fetchPortfolioAsset',
  async (id: string) => {
    const response = await axios.get<AssetResponseType>(`https://api.coincap.io/v2/assets/${id}`);
    return response.data;
  },
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clean(state) {
      state.assets = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPortfolioAsset.fulfilled, (state, action) => {
      const newAsset = action.payload.data;
      if (!state.assets.filter((item) => item.id === action.payload.data.id).length) {
        state.assets.push(newAsset);
      }
    });
  },
});

export const { clean } = portfolioSlice.actions;

export default portfolioSlice.reducer;
