import express from "express";
import { validateRequest } from "kw-utils";
import { login, logout, register } from "../controllers/vendor.controller";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/vendor.validator";

const vendorRouter = express.Router();

vendorRouter
	.route("/vendor/registration")
	.post(registrationRules(), validateRequest, register);
vendorRouter.route("/vendor/login").post(loginRules(), validateRequest, login);
vendorRouter.route("/vendor/logout").post(logout);

export default vendorRouter;
