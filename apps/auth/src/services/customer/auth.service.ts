/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { HttpStatusCodes } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { BadRequestError } from "kw-utils";
import { Repository } from "typeorm";
import { config } from "../../config";
import { Customer, CustomerRegistry } from "../../entities";
import { RegistrationCredentials } from "../../helpers/credentials/customer.credentials";
import Password from "../password";

const logger = LoggerFactory.getLogger();

class AuthService {
	private customerRepository!: Repository<Customer>;

	private customerRegistryRepository!: Repository<CustomerRegistry>;

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			if (await this.isValidCustomer(email, password)) {
				const jwt = this.generateJWTToken({ email });

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
	}

	async register(req: Request, res: Response) {
		const {
			givenName,
			familyName,
			username,
			email,
			phone,
			dateOfBirth,
			password,
		} = req.body;

		try {
			if (await this.isUsernameTaken(username)) {
				throw new BadRequestError("username already exists");
			}

			if (await this.isEmailTaken(email)) {
				throw new BadRequestError("email already exists");
			}

			await this.addNewCustomer({
				givenName,
				familyName,
				username,
				email,
				phone,
				dateOfBirth,
				password,
			});

			const jwt = this.generateJWTToken({ email });

			req.session = {
				jwt,
			};

			res.status(HttpStatusCodes.STATUS200OK).send("account created");
		} catch (err) {
			logger.error(err);
		}
	}

	logout(req: Request, res: Response) {
		req.session = null;

		res.send({});
	}

	private async isUsernameTaken(username: string): Promise<boolean> {
		const customer = await this.customerRepository.findBy({ username });

		if (customer) {
			return true;
		}

		return false;
	}

	private async isEmailTaken(email: string): Promise<boolean> {
		const customer = await this.customerRepository.findBy({ email });

		if (customer) {
			return true;
		}

		return false;
	}

	private async isValidCustomer(
		email: string,
		password: string
	): Promise<boolean> {
		const customer = await this.customerRepository.findOneBy({ email });

		if (!customer) {
			return false;
		}

		const passwordsMatch = Password.compare(customer.password, password);

		if (!passwordsMatch) {
			return false;
		}

		return true;
	}

	private generateJWTToken(options: object) {
		const jwt = JWT.sign({ ...options }, config.JWT_SECRET);

		return jwt;
	}

	private async addNewCustomer(options: RegistrationCredentials) {
		const newCustomer = new Customer();

		newCustomer.givenName = options.givenName;
		newCustomer.familyName = options.familyName;
		newCustomer.username = options.username;
		newCustomer.password = options.password;
		newCustomer.phone = options.phone;
		newCustomer.email = options.email;

		await this.customerRepository.save(newCustomer);
	}
}

export default AuthService;
