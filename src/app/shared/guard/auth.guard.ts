import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild
} from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import ability from "src/app/abilityConfig/ability";
import { Common } from "src/app/Constants/Common";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {
		if (this.authService.isLoggedIn) {
			if (
				childRoute.data.module != undefined &&
				!this.checkReadPermission(childRoute.data.module)
			) {
				this.router.navigate(["access-denied"]);
				return false;
			}
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

	checkReadPermission(moduleName: string) {
		return ability.can(Common.Actions.CAN_READ, moduleName);
	}
}
