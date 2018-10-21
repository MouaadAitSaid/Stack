import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { ConfigManagementComponent } from './config-management/config-management.component';
import { BoMenuComponent } from './bo-menu/bo-menu.component';

@NgModule({
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ],
  declarations: [
    HomeAdminComponent,
    UsersManagementComponent,
    ConfigManagementComponent,
    BoMenuComponent
  ]
})
export class BackOfficeModule { }
