import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AssetResponseType, AssetType } from 'server/src/models/models';
import PortfolioStorage, { StorageAssetType } from '../../services/localStorage.service';
import { calculateProfitSum, calculateSum } from '../../services/profit.service';

interface IPortfolioSliceState {
  assets: AssetType[];
  portfolio: StorageAssetType[];
  sum: number;
  profit: number;
}

const initialState: IPortfolioSliceState = {
  assets: [],
  portfolio: [],
  sum: 0,
  profit: 0,
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
    cleanAssets(state) {
      state.assets = [];
    },
    setPortfolio(state) {
      const portfolio = PortfolioStorage.getPortfolio();
      if (JSON.stringify(portfolio) === JSON.stringify(state.portfolio)) return;
      state.portfolio = portfolio;
      state.sum = calculateSum(state.portfolio);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPortfolioAsset.fulfilled, (state, action) => {
      const newAsset = action.payload.data;
      if (!state.assets.filter((item) => item.id === action.payload.data.id).length) {
        state.assets.push(newAsset);
        state.profit = state.sum - calculateProfitSum(state.portfolio, state.assets);
      }
    });
  },
});

export const { cleanAssets, setPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
