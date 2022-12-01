/* eslint-disable no-useless-return */
import { PatchKeys } from "kw-constants";
import { LoggerFactory } from "kw-logging";
import { DBSeed } from "kw-utils";
import path from "path";
import { DataSource } from "typeorm";
import { Patch } from "../../entities";

const logger = LoggerFactory.getLogger();

class TriggerSeed extends DBSeed {
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
					"../../assets/sql/triggers/set_timestamp.1.sql"
				),
				true
			)
		)
			return;
	}

	async getPatchLevel(): Promise<number> {
		const lookup = await this.patchRepository.findOneBy({
			key: PatchKeys.TRIGGER,
		});

		if (lookup !== null) {
			return parseInt(lookup.value, 10);
		}

		return -1;
	}

	async setPatchLevel(patchLevel: number): Promise<void> {
		const patch = new Patch();

		patch.key = PatchKeys.TRIGGER;
		patch.value = patchLevel.toString(10);

		await this.patchRepository.save(patch);

		logger.info(`Updated ${PatchKeys.TRIGGER} to ${patchLevel}`);
	}
}

export default TriggerSeed;
