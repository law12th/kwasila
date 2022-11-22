import { ValidationError } from "express-validator";
import { HttpStatusCodes } from "kw-constants";
import CustomError from "./custom-error";

class RequestValidationError extends CustomError {
	statusCode = HttpStatusCodes.STATUS400BAD_REQUEST;

	constructor(public errors: ValidationError[]) {
		super("invalid request parameters");

		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		return this.errors.map((err) => ({ message: err.msg, field: err.param }));
	}
}

export default RequestValidationError;
