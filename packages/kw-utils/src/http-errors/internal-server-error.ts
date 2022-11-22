import { HttpStatusCodes } from "kw-constants";
import CustomError from "./custom-error";

class InternalServerError extends CustomError {
	statusCode = HttpStatusCodes.STATUS500INTERNAL_SERVER_ERROR;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, InternalServerError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}

export default InternalServerError;
