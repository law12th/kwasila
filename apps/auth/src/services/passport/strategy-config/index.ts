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
];

export default strategyConfig;
