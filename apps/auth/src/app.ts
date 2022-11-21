import express from "express";
import compression from "compression";
import helmet from "helmet";
import { morganMiddleware } from "kw-logging";

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());

app.use(morganMiddleware);

export default app;
