/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as fs from "fs";
import { DataSource } from "typeorm";
import { LoggerFactory } from "kw-logging";

const logger = LoggerFactory.getLogger();

abstract class DBSeed {
	abstract getPatchLevel(): Promise<number>;
	abstract setPatchLevel(patchLevel: number): Promise<void>;
	abstract runPatches(): Promise<void>;

	protected async runPatch(
		dataSource: DataSource,
		patchLevel: number,
		sqlSource: string,
		isFile: boolean
	): Promise<boolean> {
		try {
			if ((await this.getPatchLevel()) < patchLevel) {
				const sqlText = isFile
					? await this.getSqlText(sqlSource)
					: sqlSource;

				await this.executeSqlText(dataSource, sqlText);
				await this.setPatchLevel(patchLevel);
			}
		} catch (err) {
			logger.error(err);
		}

		return true;
	}

	private async getSqlText(file: string) {
		const sqlText = await fs.promises.readFile(file, { encoding: "utf-8" });

		return sqlText;
	}

	private async executeSqlText(dataSource: DataSource, sqlText: string) {
		try {
			await dataSource.query(sqlText);
		} catch (err) {
			logger.error(err);
		}
	}
}

export default DBSeed;
