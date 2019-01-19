import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeAdminComponent} from "../back-office/home-admin/home-admin.component";
import {BfMenuComponent} from "./bf-menu/bf-menu.component";
import {HomeComponent} from "./home/home.component";



const routes: Routes = [
  {
    path: '',
    component: BfMenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: HomeComponent,
        data: {title: 'Home Admin'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
