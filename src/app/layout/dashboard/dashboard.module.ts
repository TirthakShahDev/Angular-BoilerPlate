import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbCarouselModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { StatModule } from "../../shared";
import { ToastrModule } from "ngx-toastr";

@NgModule({
	imports: [
		CommonModule,
		NgbCarouselModule,
		NgbAlertModule,
		DashboardRoutingModule,
		StatModule,
		ToastrModule.forRoot()
	],
	declarations: [DashboardComponent]
})
export class DashboardModule {}
