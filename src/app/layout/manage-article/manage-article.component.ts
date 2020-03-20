import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ArticleService } from "src/app/services/article.service";
import { IArticleData } from "src/api/types";
import { ConvertToTableFilter, parseTime } from "src/app/utils";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { BaseClass } from "src/app/models/BaseClass";
import Ability from "../../abilityConfig/ability";
import { Common } from "src/app/Constants/Common";

@Component({
	selector: "app-manage-article",
	templateUrl: "./manage-article.component.html",
	styleUrls: ["./manage-article.component.scss"],
	animations: [routerTransition()]
})
export class ManageArticleComponent extends BaseClass {
	loadingIndicator = true;
	reorderable = true;
	ColumnMode = ColumnMode;
	titlesearch = "";
	rows: IArticleData[];
	listQuery = {
		page: 1,
		limit: 10,
		sort: "+id",
		title: this.titlesearch
	};

	page = {
		limit: 10,
		count: 0,
		offset: 0
	};

	constructor(
		private articleService: ArticleService,
		private router: Router,
		private toast: ToastrService
	) {
		super();
		this.CanCreate = Ability.can(
			Common.Actions.CAN_CREATE,
			Common.Modules.ARTICLE
		);
		this.CanDelete = Ability.can(
			Common.Actions.CAN_DELETE,
			Common.Modules.ARTICLE
		);
		this.CanRead = Ability.can(Common.Actions.CAN_READ, Common.Modules.ARTICLE);
		this.CanExport = Ability.can(
			Common.Actions.CAN_EXPORT,
			Common.Modules.ARTICLE
		);
		this.CanUpdate = Ability.can(
			Common.Actions.CAN_UPDATE,
			Common.Modules.ARTICLE
		);
		this.CanActions = this.CanDelete || this.CanUpdate;
	}

	ngOnInit() {
		this.pageCallback({ offset: 0 });
	}

	editArticle(data: IArticleData) {
		this.router.navigate(["add-article"], { queryParams: { id: data.id } });
		console.log(data);
	}

	removeArticle(articleData: IArticleData) {
		console.log(articleData);
		var result = confirm("Are you Sure?");
		if (result) {
			this.articleService.removeArticles(articleData.id).subscribe(data => {
				_.remove(this.rows, function(currentObject) {
					return currentObject.id === articleData.id;
				});

				this.toast.success("Article Deleted Successfully!!");
			});
		}
	}

	pageCallback(pageInfo: {
		count?: number;
		pageSize?: number;
		limit?: number;
		offset?: number;
	}) {
		this.listQuery.page = pageInfo.offset + 1;
		this.reloadTable();
	}

	sortCallback(sortInfo: {
		sorts: { dir: string; prop: string }[];
		column: {};
		prevValue: string;
		newValue: string;
	}) {
		this.listQuery.sort = ConvertToTableFilter(
			sortInfo.sorts[0].prop,
			sortInfo.sorts[0].dir
		);
		this.reloadTable();
	}

	reloadTable() {
		this.listQuery.title = this.titlesearch;
		this.articleService.getArticles(this.listQuery).subscribe((data: any) => {
			_.forEach(data.data.items, (data: IArticleData) => {
				data.timestamp = parseTime(data.timestamp, "{d}/{m}/{y}");
			});

			this.rows = [...data.data.items];
			this.page.count = data.data.total;
		});
	}
}
