import { Body, Controller, Post } from "@nestjs/common";
import CustomerService from "./customer.service";
import { LoginDTO, SignupDTO } from "./dto";

@Controller("customer")
class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post("signup")
	async signup(
		@Body()
		signupDetails: SignupDTO
	) {
		return this.customerService.createCustomer(signupDetails);
	}

	@Post("login")
	async login(
		@Body()
		loginDetails: LoginDTO
	) {
		return this.customerService.validateCustomer(loginDetails);
	}
}

export default CustomerController;
