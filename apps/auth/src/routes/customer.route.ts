import express from "express";
import { validateRequest } from "kw-utils";
import { login, logout, register } from "../controllers/customer.controller";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/customer.validator";

const customerRouter = express.Router();

customerRouter
	.route("/customer/registration")
	.post(registrationRules(), validateRequest, register);
customerRouter
	.route("/customer/login")
	.post(loginRules(), validateRequest, login);
customerRouter.route("/customer/logout").post(logout);

export default customerRouter;
