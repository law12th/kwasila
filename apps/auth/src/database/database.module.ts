import { Module, Global } from "@nestjs/common";
import DatabaseService from "./database.service";

@Global()
@Module({
	providers: [DatabaseService],
	exports: [DatabaseService],
})
class DatabaseModule {}

export default DatabaseModule;
