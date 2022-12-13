import compression from "compression";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { morganMiddleware } from "kw-logging";
import { errorHandler, NotFoundError } from "kw-utils";
import passport from "passport";
import { customerRouter, vendorRouter } from "./routes";
import { Passport } from "./services";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(
	cookieSession({
		signed: false,
		secure: false,
		httpOnly: true,
	})
);

Passport.initializeStrategies();

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", customerRouter);
app.use("/api", vendorRouter);

app.use(morganMiddleware);

app.all("*", async () => {
	throw new NotFoundError("route not found");
});

app.use(errorHandler);

export default app;
