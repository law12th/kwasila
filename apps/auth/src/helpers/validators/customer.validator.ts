import { body } from "express-validator";

export const registrationRules = () => [
	body("given_name")
		.notEmpty()
		.isAlpha()
		.toLowerCase()
		.withMessage("invalid name"),
	body("family_name")
		.notEmpty()
		.isAlpha()
		.toLowerCase()
		.withMessage("invalid name"),
	body("username")
		.notEmpty()
		.isAlphanumeric()
		.isLength({ min: 3, max: 20 })
		.withMessage("invalid username"),
	body("email").isEmail().normalizeEmail().withMessage("invalid email"),
	body("phone").isMobilePhone("en-ZM").withMessage("invalid phone number"),
	body("date_of_birth").isDate().toDate().withMessage("invalid date of birth"),
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
	body("gender").isIn(["male", "female", "other"]),
];

export const loginRules = () => [
	body("email")
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.withMessage("invalid email"),
	body("password").trim().notEmpty().withMessage("password must not be empty"),
];
