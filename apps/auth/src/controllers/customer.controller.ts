import { Request, Response } from "express";
import { CustomerAuthService } from "../services";

class CustomerController {
	authService = new CustomerAuthService();

	async register(req: Request, res: Response) {
		await this.authService.register(req, res);
	}

	async login(req: Request, res: Response) {
		await this.authService.login(req, res);
	}

	logout(req: Request, res: Response) {
		this.authService.logout(req, res);
	}
}

export default CustomerController;
