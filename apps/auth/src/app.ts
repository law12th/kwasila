import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieSession from "cookie-session";
import { morganMiddleware } from "kw-logging";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(
	cookieSession({
		signed: false,
		secure: false,
	})
);
app.use(cors());

app.use(morganMiddleware);

export default app;
