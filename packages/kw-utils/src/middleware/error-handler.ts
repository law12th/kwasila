/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { HttpStatusCodes } from "kw-constants";
import CustomError from "../http-errors/custom-error";

const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(HttpStatusCodes.STATUS400BAD_REQUEST).send({
		errors: [{ message: "something went wrong" }],
	});
};

export default errorHandler;
