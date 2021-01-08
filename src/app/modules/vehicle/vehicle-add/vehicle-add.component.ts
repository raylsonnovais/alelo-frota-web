import { logging } from 'protractor';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MessageService } from 'primeng/api';
import { Mensagem } from 'src/app/models/mensagem.model';
import { Constant } from 'src/app/util/constant.util';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {
  isEdit:boolean = false;
  idVehivle: any;
  vehicle = new VehicleModel();
  loading: boolean = false;
  textHeader = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: VehicleService,
    private messageService: MessageService
    ) {


    }

  ngOnInit(): void {
    let route = this.router.url;
    if(route.includes('update')){
      this.isEdit = true;
      this.idVehivle = this.route.snapshot.paramMap.get('id');
    }

    if(this.isEdit) {
      this.textHeader = 'Update Vehicle';
    } else {
      this.textHeader = 'Insert Vehicle'
    }

    this.getVehicleById(this.idVehivle);
  }

  getVehicleById(id: any){
    this.service.getByIdVehicle(id).subscribe(resp =>{
      this.vehicle = resp;
      this.vehicle.plate = this.maskPlate(this.vehicle.plate);
    });
  }

  maskPlate(plate: string): string{
    return plate.substring(0,3)+'-'+plate.substring(3,8);
  }

  resetAll(){
    this.vehicle.color = null;
    this.vehicle.manufacturer = null;
    this.vehicle.model = null;
  }

  saveOrUpdate(){
    this.loading = true;
    if(this.isEdit && !this.required(this.vehicle)){

      this.service.updadeVehicle(this.vehicle).subscribe(resp => {
        this.messageService.add(new Mensagem(Constant.SUCCESS, "Success!", null));
        setTimeout(()=>{this.clear()},2000);
      }, error => {
        this.messageService.add(new Mensagem(Constant.SUCCESS, error, null));
      });
    }
  }

  required(veh: VehicleModel): boolean{
    return veh.color == null || veh.manufacturer == null || veh.model == null;
  }

  clear(){
    this.messageService.clear();
    this.vehicle = new VehicleModel();
    this.router.navigate(['vehicle']);
  }



}
