import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { BfMenuComponent } from './bf-menu/bf-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FrontOfficeRoutingModule
  ],
  declarations: [BfMenuComponent]
})
export class FrontOfficeModule { }
