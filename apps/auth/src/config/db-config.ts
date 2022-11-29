import "reflect-metadata";
import express from "express";
import { LoggerFactory } from "kw-logging";
import { DataSource } from "typeorm";
import { Customer, Patch, Vendor } from "../entities";
import config from "./env-config";

const logger = LoggerFactory.getLogger();

const app = express();

const dataSource = new DataSource({
	type: "postgres",
	host: config.DB_HOST,
	port: config.DB_PORT,
	username: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DB_NAME,
	entities: [Customer, Vendor, Patch],
});

dataSource
	.initialize()
	.then(() => {
		logger.info("database connection successfully established");
		app.emit("db_init");
	})
	.catch((err) => {
		logger.error(`database connection failed: ${err}`);
	});

export default dataSource;
