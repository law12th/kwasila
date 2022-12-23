import DatabaseService from "@/database/database.service";
import { Password } from "@/utils";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { LoggerFactory } from "kw-logging";
import { CustomerDTO, LoginDTO, SignupDTO } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

const logger = LoggerFactory.getLogger();

@Injectable()
class CustomerService {
	constructor(
		private readonly databaseService: DatabaseService,
		private jwtService: JwtService,
		private config: ConfigService
	) {}

	async createCustomer(customer: SignupDTO) {
		try {
			const usernameIsTaken = await this.determineIfUsernameIsTaken(
				customer.username
			);

			if (usernameIsTaken) {
				throw new ForbiddenException("username is taken");
			}

			const emailIsTaken = await this.determineIfEmailIsTaken(
				customer.email
			);

			if (emailIsTaken) {
				throw new ForbiddenException("email is taken");
			}

			const hashedPassword = await Password.toHash(customer.password);

			const newCustomer = await this.databaseService.customer.create({
				data: {
					...customer,
					password: hashedPassword,
				},
			});

			return this.generateJwtToken(newCustomer);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}

			logger.error(error);
		}
	}

	async validateCustomer(customer: LoginDTO) {
		try {
			const foundCustomer = await this.findCustomerByEmail(customer.email);

			if (!foundCustomer) {
				throw new ForbiddenException("Invalid credentials");
			}

			const passwordMatch = await Password.compare(
				customer.password,
				foundCustomer.password
			);

			if (!passwordMatch) {
				throw new ForbiddenException("Invalid credentials");
			}

			return this.generateJwtToken(foundCustomer);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}

			logger.error(error);
		}
	}

	private async findCustomerByEmail(email: string) {
		try {
			const customer = await this.databaseService.customer.findUnique({
				where: {
					email,
				},
			});

			return customer;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}

			logger.error(error);
		}
	}

	private async findCustomerByUsername(username: string) {
		try {
			const customer = await this.databaseService.customer.findUnique({
				where: {
					username,
				},
			});

			return customer;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}

			logger.error(error);
		}
	}

	private async determineIfUsernameIsTaken(
		username: string
	): Promise<boolean> {
		const customer = await this.findCustomerByUsername(username);

		if (customer) {
			return true;
		}

		return false;
	}

	private async determineIfEmailIsTaken(email: string): Promise<boolean> {
		const customer = await this.findCustomerByEmail(email);

		if (customer) {
			return true;
		}

		return false;
	}

	private generateJwtToken(customer: CustomerDTO) {
		const payload = { username: customer.username, sub: customer.id };

		return {
			access_token: this.jwtService.signAsync(payload, {
				secret: this.config.get("JWT_TOKEN_SECRET"),
				expiresIn: this.config.get("JWT_TOKEN_EXPIRATION_TIME"),
			}),
		};
	}
}

export default CustomerService;
