import {
	StrategyOptions as GoogleOauth2StrategyOptions,
	VerifyCallback as GoogleOauth2VerifyCallback,
} from "passport-google-oauth20";
import {
	StrategyOptions as JWTStrategyOptions,
	VerifyCallback as JWTVerifyCallback,
} from "passport-jwt";
import StrategyTypes from "../strategy-types";

interface JWTStrategy {
	type: StrategyTypes.JWT;
	options: JWTStrategyOptions;
	verify: JWTVerifyCallback;
}

interface GoogleOauth2Strategy {
	type: StrategyTypes.GOOGLE_OAUTH2;
	options: GoogleOauth2StrategyOptions;
	verify: GoogleOauth2VerifyCallback;
}

export type Strategy = JWTStrategy | GoogleOauth2Strategy;
