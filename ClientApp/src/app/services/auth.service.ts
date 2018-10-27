import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../modules/config";
import {Observable} from "rxjs";
import {User} from "../models/user";


@Injectable()
export class AuthService {

  constructor(private http: HttpClient,private _conf :ConfigService) { }
  Url: string = this._conf.getConfig().server.url + "api/Auth/";

  login  = (data : User)=> {
    return this.http.post(this.Url + 'login',data);
  }

}
