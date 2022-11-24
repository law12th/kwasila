import express from "express";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/vendor.validator";
import { login, register } from "../controllers/vendor.controller";

const vendorRouter = express.Router();

vendorRouter.route("/vendor/registration").post(registrationRules(), register);
vendorRouter.route("/vendor/login").post(loginRules(), login);

export default vendorRouter;
