import { NgModule } from "@angular/core";

import { AddArticleComponent } from "./add-article.component";
import { PageHeaderModule } from "src/app/shared";
import { CommonModule } from "@angular/common";
import { AddArticleRoutingModule } from "./add-article-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
	imports: [
		CommonModule,
		AddArticleRoutingModule,
		PageHeaderModule,
		ReactiveFormsModule,
		NgbModule
	],
	exports: [],
	declarations: [AddArticleComponent],
	providers: []
})
export class AddArticleModule {}
