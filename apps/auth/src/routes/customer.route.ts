import express from "express";
import CustomerController from "../controllers/customer.controller";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/customer.validator";

const customerRouter = express.Router();

const customerController = new CustomerController();

customerRouter
	.route("/customer/registration")
	.post(registrationRules(), customerController.register);
customerRouter
	.route("/customer/login")
	.post(loginRules(), customerController.login);

export default customerRouter;
