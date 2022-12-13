/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { HttpStatusCodes } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { config } from "../config";
import dataSource from "../config/db-config";
import { Customer } from "../entities";
import { RegistrationCredentials } from "../helpers/credentials/customer.credentials";
import { Password } from "../services";

const logger = LoggerFactory.getLogger();

const determineIfUsernameIsTaken = async (
	username: string
): Promise<boolean> => {
	const customerRepository = dataSource.getRepository(Customer);

	const customer = await customerRepository.findOneBy({ username });

	if (customer) {
		return true;
	}

	return false;
};

const determineIfEmailIsTaken = async (email: string): Promise<boolean> => {
	const customerRepository = dataSource.getRepository(Customer);

	const customer = await customerRepository.findOneBy({ email });

	if (!customer) {
		return false;
	}

	return true;
};

const determineIfCustomerLoginCredentialsAreValid = async (
	email: string,
	password: string
): Promise<boolean> => {
	const customerRepository = dataSource.getRepository(Customer);

	const customer = await customerRepository.findOneBy({ email });

	if (!customer) {
		return false;
	}

	const passwordsMatch = await Password.compare(customer.password, password);

	if (!passwordsMatch) {
		return false;
	}

	return true;
};

const generateJWTToken = (options: object): string => {
	const jwt = JWT.sign({ ...options }, config.JWT_SECRET);

	return jwt;
};

const addNewCustomer = async (options: RegistrationCredentials) => {
	const customerRepository = dataSource.getRepository(Customer);

	const newCustomer = new Customer();

	newCustomer.givenName = options.givenName;
	newCustomer.familyName = options.familyName;
	newCustomer.username = options.username;
	newCustomer.gender = options.gender;
	newCustomer.dateOfBirth = options.dateOfBirth;
	newCustomer.password = await Password.toHash(options.password);
	newCustomer.phone = options.phone;
	newCustomer.email = options.email;

	await customerRepository.save(newCustomer);
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const isValidCustomer = await determineIfCustomerLoginCredentialsAreValid(
			email,
			password
		);

		if (!isValidCustomer) {
			res.status(HttpStatusCodes.STATUS400BAD_REQUEST).json({
				error: "invalid credentials",
			});
		}
		const jwt = generateJWTToken({ email });

		req.session = {
			jwt,
		};

		res.status(HttpStatusCodes.STATUS200OK).json({ jwt });
	} catch (err) {
		logger.error(err);
	}
};

export const register = async (req: Request, res: Response) => {
	const {
		given_name,
		family_name,
		username,
		email,
		gender,
		phone,
		date_of_birth,
		password,
	} = req.body;

	try {
		const isUsernameTaken = await determineIfUsernameIsTaken(username);

		if (isUsernameTaken) {
			return res.status(HttpStatusCodes.STATUS400BAD_REQUEST).json({
				error: "username already exists",
			});
		}

		const isEmailTaken = await determineIfEmailIsTaken(email);

		if (isEmailTaken) {
			return res.status(HttpStatusCodes.STATUS400BAD_REQUEST).json({
				error: "email already exists",
			});
		}

		await addNewCustomer({
			gender,
			givenName: given_name,
			familyName: family_name,
			username,
			email,
			phone,
			dateOfBirth: date_of_birth,
			password,
		});

		const jwt = generateJWTToken({ email });

		req.session = {
			jwt,
		};

		res.status(HttpStatusCodes.STATUS200OK).json("account created");
	} catch (err) {
		logger.error(err);
	}
};

export const logout = (req: Request, res: Response): void => {
	req.session = null;

	res.send({});
};
