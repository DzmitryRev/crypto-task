import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from '../store';
import { AssetsType, AssetType } from '../assets.model';

interface IAssetsSliceState {
  assets: AssetType[],
  page: number,
  error: boolean,
  loading: boolean
}

const initialState: IAssetsSliceState = {
  assets: [],
  page: 1,
  error: false,
  loading: false,
};

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async () => {
    const response = await axios.get<AssetsType>('https://api.coincap.io/v2/assets');
    return response.data;
  },
);

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssets.pending, (state, action) => {
      state.error = false;
      state.loading = true;
      console.log(state, action);
    });
    builder.addCase(fetchAssets.fulfilled, (state, action) => {
      state.loading = false;
      state.assets = action.payload.data;
    });
    builder.addCase(fetchAssets.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// export const {  } = assetsSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default assetsSlice.reducer;
