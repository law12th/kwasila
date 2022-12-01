/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { HttpStatusCodes } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { BadRequestError } from "kw-utils";
import { config } from "../config";
import dataSource from "../config/db-config";
import { Customer } from "../entities";
import { RegistrationCredentials } from "../helpers/credentials/customer.credentials";
import Password from "../services/password";

const logger = LoggerFactory.getLogger();

const isUsernameTaken = async (username: string): Promise<boolean> => {
	const customerRepository = dataSource.getRepository(Customer);

	const customer = await customerRepository.findOneBy({ username });

	if (customer) {
		return true;
	}

	return false;
};

const isEmailTaken = async (email: string): Promise<boolean> => {
	const customerRepository = dataSource.getRepository(Customer);

	const customer = await customerRepository.findOneBy({ email });

	if (customer) {
		return true;
	}

	return false;
};

const isValidCustomer = async (
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
	newCustomer.password = await Password.toHash(options.password);
	newCustomer.phone = options.phone;
	newCustomer.email = options.email;

	await customerRepository.save(newCustomer);
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		if (await isValidCustomer(email, password)) {
			const jwt = generateJWTToken({ email });

			req.session = {
				jwt,
			};

			res.status(HttpStatusCodes.STATUS200OK).json({ jwt });
		} else {
			throw new BadRequestError("invalid credentials");
		}
	} catch (err) {
		logger.error(err);
	}
};

export const register = async (req: Request, res: Response): Promise<void> => {
	const {
		given_name,
		family_name,
		username,
		email,
		phone,
		date_of_birth,
		password,
	} = req.body;

	try {
		if (await isUsernameTaken(username)) {
			throw new BadRequestError("username already exists");
		}

		if (await isEmailTaken(email)) {
			throw new BadRequestError("email already exists");
		}

		await addNewCustomer({
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

		res.status(HttpStatusCodes.STATUS200OK).send("account created");
	} catch (err) {
		logger.error(err);
	}
};

export const logout = (req: Request, res: Response): void => {
	req.session = null;

	res.send({});
};
