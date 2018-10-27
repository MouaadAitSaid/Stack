import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {UtilsService} from "../../../services/utils.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  icons = {

  };
  user : User;
  userForm : FormGroup;



  constructor(private authSvc : AuthService,private _u : UtilsService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  login = ()=>{
    this._u.console("e",true,this.userForm)
    this.user= new User();
    this.user.buildLogin(this.userForm.get('username').value,this.userForm.get('password').value);
    this.authSvc.login(this.user).subscribe((response)=> {
      if(response["status"])
       this.authSvc.storeUser(response['token'],(res)=>{
          if(res)
            this.authSvc.manageRole(res);
         else
            this._u.console("e",true,"Token generation failed");
       });
      else
        this._u.console("e",true,"Token generation failed");
    },(error)=>{
      this._u.console("e",true,`Token generation failed ${error}`);
    });
  };


  // Form getters
  get username() { return this.userForm.get('username'); }

  get password() { return this.userForm.get('password'); }
}
