import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPrVpComponent } from './adminprvp/adminprvp.component';

const routes: Routes = [
  { path: '', component: AdminPrVpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPrVpRoutingModule { }
