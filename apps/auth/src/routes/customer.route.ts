import express from "express";
import { login, logout, register } from "../controllers/customer.controller";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/customer.validator";

const customerRouter = express.Router();

customerRouter
	.route("/customer/registration")
	.post(registrationRules(), register);
customerRouter.route("/customer/login").post(loginRules(), login);
customerRouter.route("/customer/logout").post(logout);

export default customerRouter;
