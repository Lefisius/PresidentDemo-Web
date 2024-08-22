import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dash',
    pathMatch: 'full'
  },
  { path: 'Dash', loadChildren: () => import('./modules/dash/dash.module').then(m => m.DashModule) },
  { path: 'Election', loadChildren: () => import('./modules/election/election.module').then(m => m.ElectionModule) },
  { path: 'Preshobby', loadChildren: () => import('./modules/preshobby/preshobby.module').then(m => m.PreshobbyModule) },
  { path: 'President', loadChildren: () => import('./modules/president/president.module').then(m => m.PresidentModule) },
  { path: 'Presmarriage', loadChildren: () => import('./modules/presmarriage/presmarriage.module').then(m => m.PresmarriageModule) },
  { path: 'State', loadChildren: () => import('./modules/state/state.module').then(m => m.StateModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
