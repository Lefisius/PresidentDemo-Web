import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrationComponent } from './stration/stration.component';

const routes: Routes = [
  { path: '', component: StrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrationRoutingModule { }