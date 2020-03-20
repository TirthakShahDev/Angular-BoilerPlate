import { rollbarConfig } from "./rollBarConfig";

import * as Rollbar from "rollbar";
export function rollbarFactory() {
	return new Rollbar(rollbarConfig);
}
