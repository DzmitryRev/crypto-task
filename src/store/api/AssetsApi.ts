/* eslint-disable linebreak-style */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { AssetsResponseType, AssetResponseType, HistoryResponceType } from '../assets.model';

const assetsApi = createApi({
  reducerPath: 'assetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (build) => ({
    fetchAllAssets: build.query<AssetsResponseType, { offset: number; limit: number }>({
      query: ({ offset = 0, limit = 50 }) => ({
        url: '/assets',
        params: {
          offset,
          limit,
        },
      }),
    }),
    fetchAsset: build.query<AssetResponseType, string>({
      query: (id: string) => ({
        url: `assets/${id}`,
      }),
    }),
    fetchAssetHistory: build.query<HistoryResponceType, string>({
      query: (id: string) => ({
        url: `/assets/${id}/history`,
        params: {
          interval: 'd1',
        },
      }),
    }),
  }),
});

export default assetsApi;
