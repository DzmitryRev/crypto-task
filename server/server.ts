// import * as trpc from "@trpc/server";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/", (req: Request, res: Response) => {
    res.send("Main page");
  });

app.listen(3000, () => {
  console.log("Server is running");
});
