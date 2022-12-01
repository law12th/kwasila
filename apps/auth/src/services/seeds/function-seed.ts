/* eslint-disable no-useless-return */
import { PatchKeys } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { DBSeed } from "kw-utils";
import path from "path";
import { DataSource } from "typeorm";
import { Patch } from "../../entities";

const logger = LoggerFactory.getLogger();

class FunctionSeed extends DBSeed {
	constructor(public dataSource: DataSource) {
		super();
	}

	patchRepository = this.dataSource.getRepository(Patch);

	async runPatches(): Promise<void> {
		if (
			!this.runPatch(
				this.dataSource,
				1,
				path.join(
					__dirname,
					"../../assets/sql/functions/trigger_set_timestamp.1.sql"
				),
				true
			)
		)
			return;
	}

	async getPatchLevel(): Promise<number> {
		const lookup = await this.patchRepository.findOneBy({
			key: PatchKeys.FUNCTION,
		});

		if (lookup) {
			return parseInt(lookup.value, 10);
		}

		return -1;
	}

	async setPatchLevel(patchLevel: number): Promise<void> {
		const patch = new Patch();

		patch.key = PatchKeys.FUNCTION;
		patch.value = patchLevel.toString(10);

		await this.patchRepository.save(patch);

		logger.info(`Updated ${PatchKeys.FUNCTION} to ${patchLevel}`);
	}
}

export default FunctionSeed;
