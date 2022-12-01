/* eslint-disable class-methods-use-this */
import * as fs from "fs";
import { DataSource } from "typeorm";

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
		if ((await this.getPatchLevel()) < patchLevel) {
			const sqlText = isFile ? this.getSqlText(sqlSource) : sqlSource;

			await this.executeSqlText(dataSource, sqlText);
			await this.setPatchLevel(patchLevel);
		}

		return true;
	}

	private getSqlText(file: string) {
		const sqlText = fs.readFileSync(file, { encoding: "utf-8" });

		return sqlText;
	}

	private async executeSqlText(dataSource: DataSource, sqlText: string) {
		await dataSource.query(sqlText);
	}
}

export default DBSeed;
