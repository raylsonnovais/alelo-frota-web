import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { Mensagem } from 'src/app/models/mensagem.model';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Constant } from 'src/app/util/constant.util';


@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {

  subheader ='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt'
  +'quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!';


  //Tabela
    customers = new Array<any>();
    totalRecords = 0;
    loading: boolean = false;
    plate: string = '';

  constructor(private service: VehicleService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    let page = event.first;
    if(page !== undefined && page > 0){
      page = page / 10;
    }

    this.searchList(page, event.rows);

  }

  maskPlate(plate: string): string{
    return plate.substring(0,3)+'-'+plate.substring(3,8);
  }

  update({id}: any): void {
    this.loading = true;
    this.router.navigate(['vehicle', 'update', id]);
  }

  addVehicle(){
    this.loading = true;
    this.router.navigate(['vehicle', 'insert']);
  }

  searchToPlate(){
    this.loading = true;
      if (this.plate != null){
        let plateToSearch = this.plate.replace("-","").toUpperCase();
        this.service.getByPlateVehicle(plateToSearch).subscribe(resp => {
          if (resp !=  null){
            this.customers = new Array<any>();

            this.customers.push(resp);
            this.totalRecords = 1;
            this.loading = false;
          }

        });
      }
  }

  searchList(page: any, rows: any){
    this.service.consultaPaginada(page, rows).subscribe( resp => {
      this.customers = resp.content;
      this.totalRecords = resp.totalElements;
      this.loading = false;
    })
  }

  deleteVehicle({id}: any): void{

    this.confirmationService.confirm({
      message:'Do you want to delete this vehicle?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Confirm',
      rejectLabel: 'I Don´t',
      accept: () => {
        this.loading = true;
          this.service.deleteVehicle(id).subscribe(resp => {
            debugger;
            this.loading = false;
            this.messageService.add(new Mensagem(Constant.SUCCESS, "Success!", null));
            setTimeout(() => {
              this.messageService.clear();
              this.searchList(0,10);
            }, 2000);

          });
      },
      reject: () => {

      }

    })
  }

}
