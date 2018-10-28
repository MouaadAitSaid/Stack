import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../auth.service";

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(public authSvc: AuthService) {}

  canActivate(): boolean {

    if (!this.authSvc.isLogged()) {
      
      this.authSvc.logout();
      return false;
    }
    return true;
  }
}
