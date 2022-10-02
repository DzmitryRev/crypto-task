import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AssetResponseType, AssetType } from '../assets.model';

interface IAssetSliceState {
  asset: AssetType | null,
  error: boolean,
  loading: boolean
}

const initialState: IAssetSliceState = {
  asset: null,
  error: false,
  loading: false,
};

export const fetchAsset = createAsyncThunk(
  'assets/fetchAsset',
  async (id: string) => {
    const response = await axios.get<AssetResponseType>(`https://api.coincap.io/v2/assets/${id}`);
    return response.data;
  },
);

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
  },
});

// export const {  } = assetsSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default assetSlice.reducer;
