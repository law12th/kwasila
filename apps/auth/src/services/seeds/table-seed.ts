/* eslint-disable no-useless-return */
import { PatchKeys } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { DBSeed } from "kw-utils";
import path from "path";
import { DataSource } from "typeorm";
import dataSource from "../../config/db-config";
import { Patch } from "../../entities";

const logger = LoggerFactory.getLogger();

class TableSeed extends DBSeed {
	patchRepository = dataSource.getRepository(Patch);

	async runPatches(connection: DataSource): Promise<void> {
		if (
			!this.runPatch(
				connection,
				1,
				path.join(__dirname, "../../assets/sql/tables/patch.1.sql"),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				connection,
				2,
				path.join(__dirname, "../../assets/sql/tables/vendor.1.sql"),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				connection,
				3,
				path.join(__dirname, "../../assets/sql/tables/city.1.sql"),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				connection,
				4,
				path.join(__dirname, "../../assets/sql/tables/country.1.sql"),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				connection,
				5,
				path.join(__dirname, "../../assets/sql/tables/customer.1.sql"),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				connection,
				6,
				path.join(
					__dirname,
					"../../assets/sql/tables/customer_registry.1.sql"
				),
				true
			)
		)
			return;
		if (
			!this.runPatch(
				connection,
				7,
				path.join(
					__dirname,
					"../../assets/sql/tables/vendor_registry.1.sql"
				),
				true
			)
		)
			return;
	}

	async getPatchLevel(): Promise<number> {
		const lookup = await this.patchRepository.findOneBy({
			key: PatchKeys.TABLE,
		});

		if (lookup !== null) {
			return parseInt(lookup.value, 10);
		}

		return -1;
	}

	async setPatchLevel(patchLevel: number): Promise<void> {
		const patch = new Patch();

		patch.key = PatchKeys.TABLE;
		patch.value = patchLevel.toString(10);

		await this.patchRepository.save(patch);

		logger.info(`Updated ${patch.value} to ${patchLevel}`);
	}
}

export default TableSeed;
