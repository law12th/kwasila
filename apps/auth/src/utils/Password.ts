import * as argon from "argon2";

class Password {
	static async toHash(password: string): Promise<string> {
		const hashedPassword = await argon.hash(password);

		return `${hashedPassword}`;
	}

	static async compare(
		hashedPassword: string,
		suppliedPassword: string
	): Promise<boolean> {
		const passwordsMatch = await argon.verify(
			hashedPassword,
			suppliedPassword
		);

		return passwordsMatch;
	}
}

export default Password;
