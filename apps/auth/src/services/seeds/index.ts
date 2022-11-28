import dataSource from "../../config/db-config";
import FunctionSeed from "./function-seed";
import TableSeed from "./table-seed";
import TriggerSeed from "./trigger-seed";

const initializeSeeds = async () => {
	const functionSeed = new FunctionSeed();
	const tableSeed = new TableSeed();
	const triggerSeed = new TriggerSeed();

	await functionSeed.runPatches(dataSource);
	await tableSeed.runPatches(dataSource);
	await triggerSeed.runPatches(dataSource);
};

export default initializeSeeds;
