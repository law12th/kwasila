/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
import { Strategy } from "../strategies";
import {
	createGoogleOauth2Strategy,
	createJWTStrategy,
} from "../strategy-creators";
import RegistrationTypes from "../strategy-types";

const getPassportStrategies = (strategyConfig: Strategy[]) => {
	return strategyConfig.map(({ type, options, verify }) => {
		switch (type) {
			case RegistrationTypes.JWT:
				return createJWTStrategy(options, verify);
			case RegistrationTypes.GOOGLE_OAUTH2:
				return createGoogleOauth2Strategy(options, verify);
		}
	});
};

export default getPassportStrategies;
