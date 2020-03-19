import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../models";
import { environment } from "../../environments/environment";
import { ConvertAbility } from "../utils/AbilityConverter";
import { RawRule } from "@casl/ability";
import ability from "../abilityConfig/ability";
import { json } from "body-parser";
@Injectable({
	providedIn: "root"
})
export class AuthService {
	API_URL: string = environment.APP_BASE_API;
	headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(private httpClient: HttpClient, public router: Router) {}

	register(user: User): Observable<any> {
		return this.httpClient
			.post(`${this.API_URL}/users/register`, user)
			.pipe(catchError(this.handleError));
	}

	login(UserName: string, password: string) {
		return this.httpClient
			.post<any>(`${this.API_URL}/users/login`, { UserName, password })
			.pipe(
				map(user => {
					var permissions = user.data.permissions;
					const abilities: RawRule[] = ConvertAbility(permissions);
					ability.update(abilities);

					// login successful if there's a jwt token in the response
					if (user && user.data.accessToken) {
						// store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem("currentUser", JSON.stringify(user));
						localStorage.setItem("token", user.data.accessToken);
						localStorage.setItem("abilities", JSON.stringify(abilities));
					}

					return user;
				})
			);
	}

	getAccessToken() {
		return localStorage.getItem("token");
	}

	get isLoggedIn(): boolean {
		return this.getAccessToken() !== null ? true : false;
	}

	logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
	}

	getUserProfile(id: any): Observable<any> {
		return this.httpClient
			.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers })
			.pipe(
				map((res: Response) => {
					return res || {};
				}),
				catchError(this.handleError)
			);
	}

	handleError(error: HttpErrorResponse) {
		let msg = "";
		if (error.error instanceof ErrorEvent) {
			// client-side error
			msg = error.error.message;
		} else {
			// server-side error
			msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(msg);
	}
}
