import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardGuard} from "./services/guards/auth-guard.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },
  {
    path: 'Admin',
    loadChildren: './modules/back-office/back-office.module#BackOfficeModule',
    canActivate : [AuthGuardGuard]
  },
  {
    path: 'Site',
    loadChildren: './modules/front-office/front-office.module#FrontOfficeModule',
    canActivate : [AuthGuardGuard]
  },
  {
    path: 'Login',
    loadChildren: './modules/shared/shared.module#SharedModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
