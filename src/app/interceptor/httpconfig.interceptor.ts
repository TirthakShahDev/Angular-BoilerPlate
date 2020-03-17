import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse
} from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	constructor(public toasterService: ToastrService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token: string = localStorage.getItem("token");
		if (token) {
			request = request.clone({
				headers: request.headers.set("Authorization", "Bearer " + token)
			});
		}

		if (!request.headers.has("Content-Type")) {
			request = request.clone({
				headers: request.headers.set("Content-Type", "application/json")
			});
		}

		request = request.clone({
			headers: request.headers.set("Accept", "application/json")
		});

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					console.log("event--->>>", event);
					// this.errorDialogService.openDialog(event);
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				let data = {};
				let errorData =
					error && error.error && error.error.reason ? error.error.reason : "";
				data = {
					reason: errorData,
					status: error.status
				};
				this.toasterService.error(error.error.messaege, "", {
					positionClass: "toast-top-right"
				});
				// Log to API
				return throwError(error);
			})
		);
	}
}
