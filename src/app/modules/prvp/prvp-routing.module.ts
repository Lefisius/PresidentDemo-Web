import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrvpComponent } from './prvp/prvp.component';

const routes: Routes = [
  { path: '', component: PrvpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrvpRoutingModule { }
