import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild
} from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {
		if (this.authService.isLoggedIn) {
			return true;
		}

		this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
		return false;
	}
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isLoggedIn) {
			return true;
		}

		this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
