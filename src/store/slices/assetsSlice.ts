import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AssetsResponseType, AssetType } from '../assets.model';

interface IAssetsSliceState {
  assets: AssetType[],
  offset: number,
  error: boolean,
  loading: boolean
}

const initialState: IAssetsSliceState = {
  assets: [],
  offset: 0,
  error: false,
  loading: false,
};

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (offset: number) => {
    const response = await axios.get<AssetsResponseType>(`https://api.coincap.io/v2/assets?limit=50&offset=${offset}`);
    return response.data;
  },
);

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssets.pending, (state) => {
      state.error = false;
      state.loading = true;
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

export const { setOffset } = assetsSlice.actions;

export default assetsSlice.reducer;
