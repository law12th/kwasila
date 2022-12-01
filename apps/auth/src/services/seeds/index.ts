import { DataSource } from "typeorm";
import FunctionSeed from "./function-seed";
import TableSeed from "./table-seed";

const runSeeds = async (dataSource: DataSource) => {
	await new TableSeed(dataSource).runPatches();
	await new FunctionSeed(dataSource).runPatches();
	// await new TriggerSeed(dataSource).runPatches();
};

export default runSeeds;
