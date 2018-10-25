import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },
  {
    path: 'Admin',
    loadChildren: './modules/back-office/back-office.module#BackOfficeModule'
  },
  {
    path: 'Site',
    loadChildren: './modules/front-office/front-office.module#FrontOfficeModule'
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
