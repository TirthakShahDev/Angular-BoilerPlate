import { Injectable, ErrorHandler, Inject } from "@angular/core";
import { RollbarService } from "./rollBarService";
import * as Rollbar from "rollbar";

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
	constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

	handleError(err: any): void {
		this.rollbar.error(err.originalError || err);
	}
}
