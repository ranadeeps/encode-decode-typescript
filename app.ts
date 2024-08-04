import express, { Application, NextFunction, Request, Response } from "express";

import serverRouter from "./server";
import { changeHeaderToOctet, decode } from "./utils";

const app: Application = express();
app.use(changeHeaderToOctet, express.raw(), decode);
app.use(express.json());
app.use("/server", serverRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error occured");
  res.send({ message: ` ${error} error .... :server` });
});

export = app;
