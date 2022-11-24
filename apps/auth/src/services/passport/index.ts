import passport from "passport";
import getPassportStrategies from "./passport-strategies";
import strategyConfig from "./strategy-config";

class Passport {
	static initializeStrategies() {
		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser((user: object, done) => {
			done(null, user);
		});

		const strategies = getPassportStrategies(strategyConfig);

		strategies.map((strategy) => passport.use(strategy));
	}
}

export default Passport;
