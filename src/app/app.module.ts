import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LanguageTranslationModule } from "./shared/modules/language-translation/language-translation.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared";
import { ToastrModule } from "ngx-toastr";
import { HttpConfigInterceptor } from "./interceptor/httpconfig.interceptor";
import { AbilityModule } from "@casl/angular";
import { RollbarErrorHandler } from "./rollbar-errorHandler/rolbarErrorhandler";
import { RollbarService } from "./rollbar-errorHandler/rollBarService";
import { rollbarFactory } from "./rollbar-errorHandler/rollBarFactory";

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		LanguageTranslationModule,
		AppRoutingModule,
		ToastrModule.forRoot(),
		AbilityModule.forRoot()
	],
	declarations: [AppComponent],
	providers: [
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpConfigInterceptor,
			multi: true
		},
		{ provide: ErrorHandler, useClass: RollbarErrorHandler },
		{ provide: RollbarService, useFactory: rollbarFactory }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
