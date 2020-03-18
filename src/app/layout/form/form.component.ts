import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "src/app/shared/Validators/must-match.validator";

@Component({
	selector: "app-form",
	templateUrl: "./form.component.html",
	styleUrls: ["./form.component.scss"],
	animations: [routerTransition()]
})
export class FormComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;

	constructor(private formBuilder: FormBuilder) {
		console.log(this.validation_messages);
	}
	validation_messages = {
		Title: [{ type: Validators.required.name, message: "Title is required" }],
		firstName: [
			{ type: Validators.required.name, message: "First Name is required" }
		],
		lastName: [
			{ type: Validators.required.name, message: "Last Name is required" }
		],
		email: [
			{ type: Validators.required.name, message: "Email is required" },
			{ type: Validators.email.name, message: "Invalid Email" }
		],
		review: [
			{ type: Validators.required.name, message: "Review is required" },
			{
				type: Validators.maxLength.name.toLowerCase(),
				message: "Review must have maximum 20 characters"
			}
		],
		password: [
			{
				type: Validators.required.name,
				message: "Password is required"
			},
			{
				type: Validators.minLength.name.toLowerCase(),
				message: "Password must have minimum 6 characters"
			}
		],
		confirmPassword: [
			{ type: "required", message: "Phone is required" },
			{
				type: "mustMatch",
				message: "Passwords must match"
			}
		]
	};

	ngOnInit() {
		this.registerForm = this.formBuilder.group(
			{
				title: ["", Validators.required],
				firstName: ["", Validators.required],
				lastName: ["", Validators.required],
				email: ["", [Validators.required, Validators.email]],
				review: ["", [Validators.required, Validators.maxLength(20)]],
				password: ["", [Validators.required, Validators.minLength(6)]],
				confirmPassword: ["", Validators.required],
				acceptTerms: [false, Validators.requiredTrue]
			},
			{
				validator: MustMatch("password", "confirmPassword")
			}
		);
	}
	get f() {
		return this.registerForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		debugger;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		// display form values on success
		alert(
			"SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
		);
	}

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}
}
