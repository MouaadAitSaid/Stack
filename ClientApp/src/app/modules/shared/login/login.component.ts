import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {UtilsService} from "../../../services/utils.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  icons = {

  };
  user : User;
  connectedUser : User;
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
      this.connectedUser = new User();
      this._u.console('w',true,response);
      //this.connectedUser.buildConnectedUser(response['fi'])
    });
  };


  // Form getters
  get username() { return this.userForm.get('username'); }

  get password() { return this.userForm.get('password'); }
}
