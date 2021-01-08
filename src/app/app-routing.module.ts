import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/vehicle' , pathMatch: 'full'},
  {
    path: 'vehicle',
    loadChildren: () => import('./modules/vehicle/vehicle.module').then(m => m.VehicleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
