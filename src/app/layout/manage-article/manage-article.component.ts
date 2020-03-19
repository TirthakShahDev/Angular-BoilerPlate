import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ArticleService } from "src/app/services/article.service";
import { IArticleData } from "src/api/types";
import { HttpParams } from "@angular/common/http";
import { ConvertToTableFilter } from "src/app/utils";
import { map } from "rxjs/operators";
@Component({
	selector: "app-manage-article",
	templateUrl: "./manage-article.component.html",
	styleUrls: ["./manage-article.component.scss"],
	animations: [routerTransition()]
})
export class ManageArticleComponent implements OnInit {
	loadingIndicator = true;
	reorderable = true;
	ColumnMode = ColumnMode;

	rows: IArticleData[];
	private listQuery = {
		page: 1,
		limit: 10,
		sort: "+id",
		title: ""
	};

	page = {
		limit: 10,
		count: 0,
		offset: 0
	};

	constructor(private articleService: ArticleService) {}

	ngOnInit() {
		this.pageCallback({ offset: 1 });
	}

	editArticle(data: IArticleData) {
		console.log(data);
	}

	removeArticle(data: IArticleData) {
		console.log(data);
	}

	pageCallback(pageInfo: {
		count?: number;
		pageSize?: number;
		limit?: number;
		offset?: number;
	}) {
		this.listQuery.page = pageInfo.offset;
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
		this.articleService.getArticles(this.listQuery).subscribe((data: any) => {
			this.rows = [...data.data.items];
			this.page.count = data.data.total;
		});
	}
}
