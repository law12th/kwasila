import { HttpStatusCodes } from "kw-constants";
import CustomError from "./custom-error";

class BadRequestError extends CustomError {
	statusCode = HttpStatusCodes.STATUS400BAD_REQUEST;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}

export default BadRequestError;
