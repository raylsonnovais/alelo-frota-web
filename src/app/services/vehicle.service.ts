import { VehicleModel } from './../models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const REQUEST_MAPPING = 'vehicles'
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient){  }

  public consultaPaginada(page: any, limit:any): Observable<any> {
    const url = environment.URL_BACKEND + REQUEST_MAPPING + '/paginator' +`?page=${page}&limit=${limit}`;
    return this.http.get(encodeURI(url));
  }

  public getByIdVehicle(id: any): Observable<any> {
    return this.http.get<any>(environment.URL_BACKEND + REQUEST_MAPPING + '/'+id);
  }

  public updadeVehicle(vehicle: VehicleModel): Observable<any>{
    return this.http.patch<any>(environment.URL_BACKEND + REQUEST_MAPPING + '/' + vehicle.id, vehicle);
  }

  public getByPlateVehicle(plate: string): Observable<any> {
    const url = environment.URL_BACKEND + REQUEST_MAPPING + '/filterPlate' +`?filter=${plate}`;
    return this.http.get<any>(encodeURI(url));
  }

  public deleteVehicle(id: any): Observable<any> {
    return this.http.delete<any>(environment.URL_BACKEND + REQUEST_MAPPING + '/'+id);
  }
}
