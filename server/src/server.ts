import express, { Express } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context";

const app: Express = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use("/.netlify/functions/api", app);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running. PORT=${PORT}`);
});
