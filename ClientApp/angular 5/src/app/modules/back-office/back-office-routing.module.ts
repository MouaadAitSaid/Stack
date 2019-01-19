import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeAdminComponent} from "./home-admin/home-admin.component";
import {BoMenuComponent} from "./bo-menu/bo-menu.component";
import {AdminGuard} from "../../services/guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: BoMenuComponent,
    canActivate : [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: HomeAdminComponent,
        data: {title: 'Home Admin'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
