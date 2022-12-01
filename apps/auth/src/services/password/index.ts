import bcrypt from "bcrypt";

class Password {
	static async toHash(password: string) {
		const hashedPassword = await bcrypt.hash(password, 10);

		return `${hashedPassword}`;
	}

	static async compare(hashedPassword: string, suppliedPassword: string) {
		const passwordsMatch = await bcrypt.compare(
			suppliedPassword,
			hashedPassword
		);

		return passwordsMatch;
	}
}

export default Password;
