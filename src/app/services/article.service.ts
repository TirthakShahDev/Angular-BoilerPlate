import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ArticleService {
	API_URL: string = environment.APP_BASE_API;
	headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(private httpClient: HttpClient) {}

	getArticles(param) {
		return this.httpClient
			.get<any>(`${this.API_URL}/articles`, { params: param })
			.pipe(
				map(article => {
					return article;
				})
			);
	}
}
