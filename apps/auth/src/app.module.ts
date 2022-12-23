import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { config } from "./config";
import CustomerModule from "./customer/customer.module";
import DatabaseModule from "./database/database.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		DatabaseModule,
		CustomerModule,
	],
})
class AppModule {}

export default AppModule;
