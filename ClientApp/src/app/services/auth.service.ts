import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../modules/config";
import {User} from "../models/user";
import * as jwt_decode from "jwt-decode";
import {UtilsService} from "./utils.service";
import {split} from "ts-node";
import {Router} from "@angular/router";


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private _conf: ConfigService, private _u: UtilsService,
              private router: Router) {
  }

  Url: string = this._conf.getConfig().server.url + "api/Auth/";
  tokenMethod = this._conf.getConfig().opts.localStorage;
  login = (data: User) => {
    return this.http.post(this.Url + 'login', data);
  };

  storeUser = (data, cb) => {
    if (data) {
      this._u.console('w', false, `Token :     ${data.split(' ')[1]}`);

      let userData = jwt_decode(data.split(' ')[1]);
      this._u.console('w', false, `Connected User Data :${userData.firstName}`);

      if (this.tokenMethod) {
        localStorage.setItem('token', data);
        localStorage.setItem('cUser', userData);
      } else {
        sessionStorage.setItem('token', data);
        sessionStorage.setItem('cUser', userData);
      }
      cb(userData.role);
    } else {
      cb(false)
    }
  };

  manageRole = (role) => {
    switch (role) {
      case "SuperAdmin" :
        this.router.navigate(['Admin/Home']);
        break;
      default :
        this.logout();
    }
  };

  logout = () => {
    if (this.tokenMethod) {
      localStorage.removeItem('cUser');
    } else {
      sessionStorage.removeItem('cUser');
    }
    this.router.navigate([''])
  };
  isLogged = (): boolean => {
    return !!sessionStorage.getItem('token');
  };


  getUser = (data) => {
    if (this.tokenMethod) {
      localStorage.getItem('cUser');
    } else {
      sessionStorage.getItem('cUser');
    }
  };

}
