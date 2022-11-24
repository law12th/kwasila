import { body } from "express-validator";

export const registrationRules = () => [
	body("vendor_name")
		.notEmpty()
		.isAlpha()
		.toLowerCase()
		.withMessage("invalid name"),
	body("email").isEmail().normalizeEmail().withMessage("invalid email"),
	body("phone_1").isMobilePhone("en-ZM").withMessage("invalid phone number"),
	body("phone_2").isMobilePhone("en-ZM").withMessage("invalid phone number"),
	body("password")
		.trim()
		.notEmpty()
		.isStrongPassword({
			minLength: 6,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage("password must be at least 6 characters long"),
	body("address").notEmpty(),
];

export const loginRules = () => [
	body("vendor_name").notEmpty().withMessage("vendor name must not be empty"),
	body("email")
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.withMessage("invalid email"),
	body("password").trim().notEmpty().withMessage("password must not be empty"),
];
