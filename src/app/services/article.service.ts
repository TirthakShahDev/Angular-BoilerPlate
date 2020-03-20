import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { IArticleData } from "src/api/types";

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

	addArticles(param) {
		return this.httpClient.post<any>(`${this.API_URL}/articles`, {
			params: param
		});
	}

	updateArticles(param) {
		return this.httpClient.put<any>(`${this.API_URL}/articles`, {
			params: param
		});
	}

	removeArticles(id: number) {
		return this.httpClient.delete<any>(`${this.API_URL}/articles/${id}`).pipe(
			map(article => {
				return article;
			})
		);
	}
	getArticle(id: Number) {
		return this.httpClient
			.get<IArticleData>(`${this.API_URL}/articles/${id}`)
			.pipe(
				map((article: any) => {
					return article.data.article;
				})
			);
	}
}
