import {
	Strategy as GoogleOauth2Strategy,
	StrategyOptions as GoogleOauth2StrategyOptions,
	VerifyCallback as GoogleOauth2VerifyCallback,
} from "passport-google-oauth20";
import {
	Strategy as JWTStrategy,
	StrategyOptions as JWTStrategyOptions,
	VerifyCallback as JWTVerifyCallback,
} from "passport-jwt";

export const createJWTStrategy = (
	options: JWTStrategyOptions,
	verify: JWTVerifyCallback
) => new JWTStrategy(options, verify);

export const createGoogleOauth2Strategy = (
	options: GoogleOauth2StrategyOptions,
	verify: GoogleOauth2VerifyCallback
) => new GoogleOauth2Strategy(options, verify);
