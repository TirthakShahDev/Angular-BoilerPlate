import { OnInit } from "@angular/core";

export class BaseClass implements OnInit {
	ngOnInit(): void {}
	CanRead: boolean;
	CanDelete: boolean;
	CanUpdate: boolean;
	CanExport: boolean;
	CanCreate: boolean;
	CanActions: boolean;

	constructor() {}
}
