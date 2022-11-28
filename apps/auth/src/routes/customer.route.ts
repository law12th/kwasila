import express from "express";
import { CustomerController } from "../controllers";
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
customerRouter.route("/customer/logout").post(customerController.logout);

export default customerRouter;
