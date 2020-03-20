import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ArticleService } from "src/app/services/article.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IArticleData } from "src/api/types";
import { parseTime } from "../../utils";

@Component({
	selector: "app-add-article",
	templateUrl: "./add-article.component.html",
	styleUrls: ["./add-article.component.scss"],
	animations: [routerTransition()]
})
export class AddArticleComponent implements OnInit {
	articleModel = {
		title: "",
		author: "",
		reviewer: "",
		timestamp: ""
	};

	buttonText: string = "";

	addarticleForm: FormGroup;
	submitted = false;
	isEdit: boolean;
	constructor(
		private formBuilder: FormBuilder,
		private articleService: ArticleService,
		private router: Router,
		private route: ActivatedRoute,
		private toast: ToastrService
	) {}

	validation_messages = {
		Title: [{ type: Validators.required.name, message: "Title is required" }],
		timestamp: [
			{ type: Validators.required.name, message: "Time is required" }
		],
		author: [{ type: Validators.required.name, message: "Author is required" }],
		reviewer: [
			{ type: Validators.required.name, message: "Reviewer is required" }
		]
	};

	ngOnInit(): void {
		this.buttonText = "Add Article";

		this.addarticleForm = this.formBuilder.group({
			title: ["", Validators.required],
			timestamp: ["", Validators.required],
			author: ["", Validators.required],
			reviewer: ["", [Validators.required]]
		});
		this.route.queryParamMap.subscribe((params: any) => {
			if (params.params.id > 0) {
				this.isEdit = true;
				this.articleService.getArticle(params.params.id).subscribe(
					(data: IArticleData) => {
						this.articleModel.title = data.title;
						this.articleModel.reviewer = data.reviewer;
						this.articleModel.author = data.author;
						this.articleModel.timestamp = parseTime(
							data.timestamp,
							"{d}/{m}/{y}"
						);
						this.buttonText = "Update Article";
					},
					error => {
						console.error(error);
					}
				);
			}
		});
	}

	get f() {
		return this.addarticleForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.addarticleForm.invalid) {
			return;
		}

		this.isEdit ? this.update() : this.save();
	}

	save() {
		this.articleService.addArticles(this.addarticleForm.value).subscribe(
			data => {
				console.log(data);
				this.toast.success("Add Article Successfully!!!");
				this.router.navigate(["manage-article"]);
			},
			error => {
				console.error(error);
			}
		);
	}

	update() {
		this.articleService.addArticles(this.addarticleForm.value).subscribe(
			data => {
				console.log(data);
				this.toast.success("Update Article Successfully!!!");
				this.router.navigate(["manage-article"]);
			},
			error => {
				console.error(error);
			}
		);
	}
}
