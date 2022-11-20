import * as winston from "winston";
import { Transport } from "./transports";
declare const createLogger: (transportsConfig: Transport[]) => winston.Logger;
export default createLogger;
//# sourceMappingURL=logger.d.ts.map