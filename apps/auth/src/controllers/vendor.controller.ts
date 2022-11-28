/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { HttpStatusCodes } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { BadRequestError } from "kw-utils";
import { Repository } from "typeorm";
import { config } from "../config";
import { Vendor } from "../entities";
import { RegistrationCredentials } from "../helpers/credentials/vendor.credentials";
import Password from "../services/password";

const logger = LoggerFactory.getLogger();
class VendorController {
	private vendorRepository!: Repository<Vendor>;

	async login(req: Request, res: Response): Promise<void> {
		const { vendor_name, email, password } = req.body;

		try {
			if (await this.isValidVendor(vendor_name, email, password)) {
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

	async register(req: Request, res: Response): Promise<void> {
		const { vendor_name, email, address, phone_1, phone_2, password } =
			req.body;

		try {
			if (await this.isVendorNameTaken(vendor_name)) {
				throw new BadRequestError("vendor name already exists");
			}

			if (await this.isEmailTaken(email)) {
				throw new BadRequestError("email already exists");
			}

			this.addNewVendor({
				vendor_name,
				email,
				address,
				phone_1,
				phone_2,
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

	logout(req: Request, res: Response): void {
		req.session = null;

		res.send({});
	}

	private async isValidVendor(
		vendorName: string,
		email: string,
		password: string
	): Promise<boolean> {
		const vendor = await this.vendorRepository.findOneBy({
			vendorName,
			email,
		});

		if (!vendor) {
			return false;
		}

		const passwordsMatch = Password.compare(vendor.password, password);

		if (!passwordsMatch) {
			return false;
		}

		return true;
	}

	private generateJWTToken(options: object) {
		const jwt = JWT.sign({ ...options }, config.JWT_SECRET);

		return jwt;
	}

	private async isVendorNameTaken(vendorName: string): Promise<boolean> {
		const vendor = await this.vendorRepository.findOneBy({ vendorName });

		if (vendor) {
			return true;
		}

		return false;
	}

	private async isEmailTaken(email: string): Promise<boolean> {
		const vendor = await this.vendorRepository.findOneBy({ email });

		if (vendor) {
			return true;
		}

		return false;
	}

	private async addNewVendor(options: RegistrationCredentials): Promise<void> {
		const vendor = new Vendor();

		vendor.address = options.address;
		vendor.email = options.email;
		vendor.password = options.password;
		vendor.phone1 = options.phone_1;
		vendor.phone2 = options.phone_2;
		vendor.vendorName = options.vendor_name;

		this.vendorRepository.save(vendor);
	}
}

export default VendorController;
