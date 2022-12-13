import fs from "fs";
import { LoggerFactory } from "kw-logging";
import path from "path";
import { DataSource } from "typeorm";
import FunctionSeed from "./function-seed";
import TableSeed from "./table-seed";
import TriggerSeed from "./trigger-seed";

const logger = LoggerFactory.getLogger();

const runSeeds = async (dataSource: DataSource) => {
	const doesTableExistSql = await fs.promises.readFile(
		path.join(__dirname, "../../assets/sql/helpers/does_table_exist.1.sql"),
		{ encoding: "utf-8" }
	);

	const patchTable = await dataSource.query(doesTableExistSql, [
		"sys",
		"patch",
	]);

	if (!patchTable[0].exists) {
		try {
			const patchSql = await fs.promises.readFile(
				path.join(__dirname, "../../assets/sql/tables/patch.1.sql"),
				{ encoding: "utf-8" }
			);
			await dataSource.query(patchSql);
		} catch (err) {
			logger.error(err);
		}
	}

	await new TableSeed(dataSource).runPatches();
	await new FunctionSeed(dataSource).runPatches();
	await new TriggerSeed(dataSource).runPatches();
};

export default runSeeds;
