import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bo-menu',
  templateUrl: './bo-menu.component.html',
  styleUrls: ['./bo-menu.component.scss']
})
export class BoMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNav = ()=> {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  };


  closeNav = ()=> {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
