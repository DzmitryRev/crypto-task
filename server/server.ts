// import * as trpc from "@trpc/server";
import express, { Express, Request, Response } from "express";
import * as trpc from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

function createRouter() {
    return trpc.router<Context>();
  }

const appRouter = createRouter().query("hello", {
  async resolve() {
    return { name: "dima" };
  },
});
export type AppRouter = typeof appRouter;

const app: Express = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("Server is running");
});
