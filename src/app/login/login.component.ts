import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { routerTransition } from "../router.animations";
import { AuthService } from "../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {
		if (this.authService.isLoggedIn) {
			this.router.navigate(["/dashboard"]);
		}
	}
	get f() {
		return this.loginForm.controls;
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ["", Validators.required],
			password: ["", Validators.required]
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
	}

	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}
		this.loading = true;
		this.authService
			.login(this.f.username.value, this.f.password.value)
			.pipe(first())
			.subscribe(
				() => {
					this.router.navigate([this.returnUrl]);
				},
				() => {
					this.loading = false;
				}
			);
	}
}
