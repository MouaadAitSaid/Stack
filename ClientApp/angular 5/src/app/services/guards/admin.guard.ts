import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public authSvc: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role = this.authSvc.gteUserRole();
    if (
      !this.authSvc.isLogged() ||(role !== "Admin"&& role !== "SuperAdmin")
    ) {
      this.authSvc.logout();
      return false;
    }
    return true;
  }
}
