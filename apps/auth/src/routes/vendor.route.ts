import express from "express";
import {
	loginRules,
	registrationRules,
} from "../helpers/validators/vendor.validator";
import { VendorController } from "../controllers";

const vendorController = new VendorController();

const vendorRouter = express.Router();

vendorRouter
	.route("/vendor/registration")
	.post(registrationRules(), vendorController.register);
vendorRouter.route("/vendor/login").post(loginRules(), vendorController.login);
vendorRouter.route("/vendor/logout").post(vendorController.logout);

export default vendorRouter;
