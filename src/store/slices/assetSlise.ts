import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from '../store';
import { AssetType } from '../assets.model';

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
  async (id: number) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
    return response.data;
  },
);

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsset.pending, (state, action) => {
      state.error = false;
      state.loading = true;
      console.log(state, action);
    });
    builder.addCase(fetchAsset.fulfilled, (state, action) => {
      console.log(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchAsset.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// export const {  } = assetsSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default assetsSlice.reducer;
