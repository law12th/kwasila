import express from "express";
import { login, logout, register } from "../controllers/vendor.controller";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/vendor.validator";

const vendorRouter = express.Router();

vendorRouter.route("/vendor/registration").post(registrationRules(), register);
vendorRouter.route("/vendor/login").post(loginRules(), login);
vendorRouter.route("/vendor/logout").post(logout);

export default vendorRouter;
