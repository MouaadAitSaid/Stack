import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm : FormGroup;



  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  login = ()=>{
    console.log(this.userForm);
  }
}
