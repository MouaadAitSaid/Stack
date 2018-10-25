import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { BfMenuComponent } from './bf-menu/bf-menu.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FrontOfficeRoutingModule
  ],
  declarations: [
    BfMenuComponent,
    HomeComponent
  ]
})
export class FrontOfficeModule { }
