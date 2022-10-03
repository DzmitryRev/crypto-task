import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  AssetResponseType, AssetType, HistoryResponceType, HistoryType,
} from '../assets.model';

interface IAssetSliceState {
  asset: AssetType | null;
  history: HistoryType[];
  error: boolean;
  loading: boolean;
}

const initialState: IAssetSliceState = {
  asset: null,
  history: [],
  error: false,
  loading: false,
};

export const fetchAsset = createAsyncThunk('asset/fetchAsset', async (id: string) => {
  const response = await axios.get<AssetResponseType>(`https://api.coincap.io/v2/assets/${id}`);
  return response.data;
});

export const fetchHistory = createAsyncThunk('asset/fecthHistory', async (id: string) => {
  const response = await axios.get<HistoryResponceType>(
    `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
  );
  return response.data;
});

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsset.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchAsset.fulfilled, (state, action) => {
      state.loading = false;
      state.asset = action.payload.data;
    });
    builder.addCase(fetchAsset.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.history = action.payload.data;
    });
  },
});

export default assetSlice.reducer;
