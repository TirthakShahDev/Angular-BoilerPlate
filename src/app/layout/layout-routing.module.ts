import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { AuthGuard } from "../shared/guard/auth.guard";
import { Common } from "../Constants/Common";

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
				path: "charts",
				loadChildren: () =>
					import("./charts/charts.module").then(m => m.ChartsModule)
			},
			{
				path: "tables",
				loadChildren: () =>
					import("./tables/tables.module").then(m => m.TablesModule)
			},
			{
				path: "forms",
				loadChildren: () => import("./form/form.module").then(m => m.FormModule)
			},
			{
				path: "bs-element",
				loadChildren: () =>
					import("./bs-element/bs-element.module").then(m => m.BsElementModule)
			},
			{
				path: "grid",
				loadChildren: () => import("./grid/grid.module").then(m => m.GridModule)
			},
			{
				path: "components",
				loadChildren: () =>
					import("./bs-component/bs-component.module").then(
						m => m.BsComponentModule
					)
			},
			{
				path: "blank-page",
				loadChildren: () =>
					import("./blank-page/blank-page.module").then(m => m.BlankPageModule)
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
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {}
