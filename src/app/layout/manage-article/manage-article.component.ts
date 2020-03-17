import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
@Component({
	selector: "app-manage-article",
	templateUrl: "./manage-article.component.html",
	styleUrls: ["./manage-article.component.scss"],
	animations: [routerTransition()]
})
export class ManageArticleComponent implements OnInit {
	rows = [
		{ name: "Austin", gender: "Male", company: "Swimlane" },
		{ name: "Dany", gender: "Male", company: "KFC" },
		{ name: "Molly", gender: "Female", company: "Burger King" }
	];
	columns = [{ prop: "name" }, { name: "Gender" }, { name: "Company" }];

	constructor() {}

	ngOnInit() {}
}
