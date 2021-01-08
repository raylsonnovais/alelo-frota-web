import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table'
import { VehicleService } from 'src/app/services/vehicle.service';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MessageModule} from 'primeng/message';
import { MessagesModule} from 'primeng/messages';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



@NgModule({
  declarations: [VehicleSearchComponent, VehicleAddComponent],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule,
    RadioButtonModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
    ConfirmDialogModule,
    VehicleRoutingModule
  ],
  providers:[VehicleService]
})
export class VehicleModule { }
