import { HttpStatusCodes } from "kw-constants";
import CustomError from "./custom-error";

class NotFoundError extends CustomError {
	statusCode = HttpStatusCodes.STATUS404NOT_FOUND;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}

export default NotFoundError;
