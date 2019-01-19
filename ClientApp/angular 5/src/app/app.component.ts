import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements  OnInit {
  title = 'ASM-Dummy Stack';

  constructor(private titleScv : Title) {

  }

  ngOnInit(): void {
    this.titleScv.setTitle(this.title);
  }

}
