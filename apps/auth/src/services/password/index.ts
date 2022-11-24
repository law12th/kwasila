import bcrypt from "bcrypt";

class Password {
	static toHash(password: string) {
		const hashedPassword = bcrypt.hashSync(password, 10);

		return `${hashedPassword}`;
	}

	static compare(hashedPassword: string, suppliedPassword: string) {
		const passwordsMatch = bcrypt.compareSync(
			suppliedPassword,
			hashedPassword
		);

		return passwordsMatch;
	}
}

export default Password;
