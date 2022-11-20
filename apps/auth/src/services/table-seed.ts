/* eslint-disable no-magic-numbers */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
import { DBSeed } from "kw-utils";
import { DataSource } from "typeorm";
import path from "path";

class TableSeed extends DBSeed {
	runPatches(dataSource: DataSource): void {
		if (
			!this.runPatch(
				dataSource,
				1,
				path.join(__dirname, "../assets/sql/tables/customer.1.sql"),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				dataSource,
				2,
				path.join(__dirname, "../assets/sql/tables/vendor.1.sql"),
				true
			)
		)
			return;
	}

	getPatchLevel(): number {
		throw new Error("Method not implemented.");
	}

	setPatchLevel(patchLevel: number): void {
		if (patchLevel > 2) {
			console.log("bigger");
		}
	}
}

export default TableSeed;
