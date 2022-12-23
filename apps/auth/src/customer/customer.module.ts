import { Module } from "@nestjs/common";
import CustomerController from "./customer.controller";
import CustomerService from "./customer.service";
import { JWTStrategy, GoogleStrategy } from "./strategy/";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [PassportModule, JwtModule.register({})],
	providers: [CustomerService, JWTStrategy, GoogleStrategy],
	controllers: [CustomerController],
})
class CustomerModule {}

export default CustomerModule;
