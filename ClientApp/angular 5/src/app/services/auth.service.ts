import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../modules/config";
import {User} from "../models/user";
import * as jwt_decode from "jwt-decode";
import {UtilsService} from "./utils.service";
import {split} from "ts-node";
import {Router} from "@angular/router";
import {debug} from "util";


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
        localStorage.setItem('cUser', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('token', data);
        sessionStorage.setItem('cUser', JSON.stringify(userData));
      }
      this._u.console("w", true, userData.exp);
      
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

  gteUserRole = ()=>{
    let payload = null;
    if (this.tokenMethod) {
      payload = JSON.parse(localStorage.getItem('cUser'));
    } else {
      payload = JSON.parse(sessionStorage.getItem('cUser'));
    }
    if(payload!==null)
      return payload.role
    this.logout();
  };

  logout = () => {
    if (this.tokenMethod) {
      localStorage.removeItem('cUser');
      localStorage.removeItem('token');
    } else {
      sessionStorage.removeItem('cUser');
      sessionStorage.removeItem('token');
    }
    this.router.navigate(['Login'])
  };


  isLogged = (): boolean => {
    let payload = null;
    this._u.console("i", false, localStorage.getItem('cUser'));
    if (this.tokenMethod) {
      
      payload = JSON.parse(localStorage.getItem('cUser'));
    } else {
      payload = JSON.parse(sessionStorage.getItem('cUser'));
    }
    var current_time = new Date().getTime() / 1000;
    if (payload!==null)
      return current_time < payload.exp;
    else
      return false
  };


  getUser = (data) => {
    if (this.tokenMethod) {
      localStorage.getItem('cUser');
    } else {
      sessionStorage.getItem('cUser');
    }
  };

}
