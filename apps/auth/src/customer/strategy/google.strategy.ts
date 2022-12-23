/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(config: ConfigService) {
		super({
			clientID: config.get<string>("GOOGLE_CLIENT_ID"),
			clientSecret: config.get<string>("GOOGLE_CLIENT_SECRET"),
			callbackURL: config.get<string>("GOOGLE_CALLBACK_URL"),
			scope: ["email", "profile"],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback
	): Promise<any> {
		const { name, emails } = profile;

		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			accessToken,
			refreshToken,
		};

		done(null, user);
	}
}

export default GoogleStrategy;
