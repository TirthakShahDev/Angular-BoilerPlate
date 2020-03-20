import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManageArticleRoutingModule } from "./manage-article-routing.module";
import { ManageArticleComponent } from "./manage-article.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PageHeaderModule } from "src/app/shared";
import { AbilityModule } from "@casl/angular";

@NgModule({
	imports: [
		CommonModule,
		ManageArticleRoutingModule,
		NgxDatatableModule,
		PageHeaderModule,
		AbilityModule
	],
	declarations: [ManageArticleComponent]
})
export class ManageArticleModule {}
