import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { AuthGuard } from "../shared/guard/auth.guard";
import { Common } from "../Constants/Common";
import { AddArticleComponent } from "./add-article/add-article.component";

const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		canActivateChild: [AuthGuard],
		children: [
			{
				path: "",
				redirectTo: "dashboard",
				pathMatch: "prefix",
				data: { module: Common.Modules.DASHBOARD }
			},
			{
				path: "dashboard",
				loadChildren: () =>
					import("./dashboard/dashboard.module").then(m => m.DashboardModule),
				data: { module: Common.Modules.DASHBOARD }
			},
			{
				path: "forms",
				loadChildren: () => import("./form/form.module").then(m => m.FormModule)
			},
			{
				path: "components",
				loadChildren: () =>
					import("./bs-component/bs-component.module").then(
						m => m.BsComponentModule
					)
			},
			{
				path: "manage-article",
				loadChildren: () =>
					import("./manage-article/manage-article.module").then(
						m => m.ManageArticleModule
					),
				data: { module: Common.Modules.ARTICLE }
			},
			{
				path: "access-denied",
				loadChildren: () =>
					import("../access-denied/access-denied.module").then(
						m => m.AccessDeniedModule
					)
			},
			{
				path: "add-article",
				loadChildren: () =>
					import("./add-article/add-article.module").then(
						m => m.AddArticleModule
					)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {}
