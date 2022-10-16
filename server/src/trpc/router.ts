import { Context } from "./context";
import * as trpc from "@trpc/server";
import { AssetsResponseType } from "../models/models";
import axios from "axios";

function createRouter() {
  return trpc.router<Context>();
}

export const appRouter = createRouter().query("assets", {
  async resolve() {
    const res = await axios.get<AssetsResponseType>("https://api.coincap.io/v2/assets");
    return res.data;
  },
});

export type AppRouter = typeof appRouter;
