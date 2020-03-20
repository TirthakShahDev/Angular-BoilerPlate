import { IArticleData } from "src/api/types";

export class ArticleModel implements IArticleData {
	id: number;
	status: string;
	title: string;
	abstractContent: string;
	fullContent: string;
	sourceURL: string;
	imageURL: string;
	timestamp: string | number;
	platforms: string[];
	disableComment: boolean;
	importance: number;
	author: string;
	reviewer: string;
	type: string;
	pageviews: number;
}
