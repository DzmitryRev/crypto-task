import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from '../store';
import { AssetType } from '../assets.model';

interface IRatingSliceState {
  topRankAssets: AssetType[],
  error: boolean,
  loading: boolean
}

const initialState: IRatingSliceState = {
  topRankAssets: [],
  error: false,
  loading: false,
};

export const fetchTopRankAssets = createAsyncThunk(
  'assets/fetchTopRankAssets',
  async () => {
    const response = await axios.get('https://api.coincap.io/v2/assets&limit=3');
    return response.data;
  },
);

export const assetsSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopRankAssets.pending, (state, action) => {
      state.error = false;
      state.loading = true;
      console.log(state, action);
    });
    builder.addCase(fetchTopRankAssets.fulfilled, (state, action) => {
      console.log(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchTopRankAssets.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// export const {  } = assetsSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default assetsSlice.reducer;
