import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleSearchComponent
  },
  {
    path: 'update/:id',
    component: VehicleAddComponent
  },
  {
    path: 'insert',
    component: VehicleAddComponent
  }

];

export const VehicleRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
