/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ExtractJwt } from "passport-jwt";
import { config } from "../../../config";
import { Strategy } from "../strategies";
import StrategyTypes from "../strategy-types";

const strategyConfig: Strategy[] = [
	{
		type: StrategyTypes.JWT,
		options: {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.JWT_SECRET,
		},
		verify: (jwtPayload, done) => {
			if (!jwtPayload) {
				return done("No token found");
			}
			return done(null, jwtPayload);
		},
	},
	{
		type: StrategyTypes.GOOGLE_OAUTH2,
		options: {
			clientID: config.GOOGLE_CLIENT_iD,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_OAUTH_CALLBACK_URL,
		},
		// @ts-ignore
		verify: (_accessToken, _refreshToken, profile, done) =>
			done(undefined, profile),
	},
];

export default strategyConfig;
