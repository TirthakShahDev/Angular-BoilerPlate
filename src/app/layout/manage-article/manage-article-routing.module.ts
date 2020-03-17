import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageArticleComponent } from "./manage-article.component";

const routes: Routes = [
	{
		path: "",
		component: ManageArticleComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ManageArticleRoutingModule {}
