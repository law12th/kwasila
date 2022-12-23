import { NestFactory } from "@nestjs/core";
import { LoggerFactory } from "kw-logging";
import AppModule from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: LoggerFactory.getLogger(),
	});
	await app.listen(3000);
}

bootstrap();
