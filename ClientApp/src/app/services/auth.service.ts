import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../modules/config";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,private _conf :ConfigService) { }
  Url: string = this._conf.getConfig() + "api/Auth/";

  login = (data)=>{
    return this.http.post(this.Url + 'login',data);
  }

}
