import * as trpc from '@trpc/server';
import axios from 'axios';
import { z } from 'zod';
import { AssetResponseType, AssetsResponseType, HistoryResponceType } from '../types/types';
import { Context } from './context';

function createRouter() {
  return trpc.router<Context>();
}

export const appRouter = createRouter()
  .query('assets', {
    input: z.object({ offset: z.number(), limit: z.number() }),
    async resolve(req) {
      const res = await axios.get<AssetsResponseType>('https://api.coincap.io/v2/assets', {
        params: {
          offset: req.input.offset,
          limit: req.input.limit,
        },
      });
      return res.data;
    },
  })
  .query('asset', {
    input: z.string(),
    async resolve(req) {
      const res = await axios.get<AssetResponseType>(
        `https://api.coincap.io/v2/assets/${req.input}`,
      );
      return res.data;
    },
  })
  .query('history', {
    input: z.string(),
    async resolve(req) {
      const date = new Date();
      const res = await axios.get<HistoryResponceType>(
        `https://api.coincap.io/v2/assets/${req.input}/history`,
        {
          params: {
            interval: 'd1',
            start: date.setMonth(date.getMonth() - 1),
            end: new Date().getTime(),
          },
        },
      );
      return res.data;
    },
  });

export type AppRouter = typeof appRouter;
