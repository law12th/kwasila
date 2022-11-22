import { HttpStatusCodes } from "kw-constants";
import CustomError from "./custom-error";

class UnauthorizedError extends CustomError {
	statusCode = HttpStatusCodes.STATUS401UNAUTHORIZED;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}

export default UnauthorizedError;
