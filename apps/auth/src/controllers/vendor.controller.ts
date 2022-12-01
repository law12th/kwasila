/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { HttpStatusCodes } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { BadRequestError } from "kw-utils";
import { config } from "../config";
import dataSource from "../config/db-config";
import { Vendor } from "../entities";
import { RegistrationCredentials } from "../helpers/credentials/vendor.credentials";
import Password from "../services/password";

const logger = LoggerFactory.getLogger();

const isEmailTaken = async (email: string): Promise<boolean> => {
	const vendorRepository = dataSource.getRepository(Vendor);

	const vendor = await vendorRepository.findOneBy({ email });

	if (vendor) {
		return true;
	}

	return false;
};

const isVendorNameTaken = async (vendorName: string): Promise<boolean> => {
	const vendorRepository = dataSource.getRepository(Vendor);

	const vendor = await vendorRepository.findOneBy({ vendorName });

	if (vendor) {
		return true;
	}

	return false;
};

const isValidVendor = async (
	vendorName: string,
	email: string,
	password: string
): Promise<boolean> => {
	const vendorRepository = dataSource.getRepository(Vendor);

	const vendor = await vendorRepository.findOneBy({
		vendorName,
		email,
	});

	if (!vendor) {
		return false;
	}

	const passwordsMatch = await Password.compare(vendor.password, password);

	if (!passwordsMatch) {
		return false;
	}

	return true;
};

const generateJWTToken = (options: object): string => {
	const jwt = JWT.sign({ ...options }, config.JWT_SECRET);

	return jwt;
};

const addNewVendor = async (
	options: RegistrationCredentials
): Promise<void> => {
	const vendorRepository = dataSource.getRepository(Vendor);

	const vendor = new Vendor();

	vendor.address = options.address;
	vendor.email = options.email;
	vendor.password = await Password.toHash(options.password);
	vendor.phone1 = options.phone_1;
	vendor.phone2 = options.phone_2;
	vendor.vendorName = options.vendor_name;

	await vendorRepository.save(vendor);
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { vendor_name, email, password } = req.body;

	try {
		if (await isValidVendor(vendor_name, email, password)) {
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
	const { vendor_name, email, address, phone_1, phone_2, password } = req.body;

	try {
		if (await isVendorNameTaken(vendor_name)) {
			throw new BadRequestError("vendor name already exists");
		}

		if (await isEmailTaken(email)) {
			throw new BadRequestError("email already exists");
		}

		await addNewVendor({
			vendor_name,
			email,
			address,
			phone_1,
			phone_2,
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
