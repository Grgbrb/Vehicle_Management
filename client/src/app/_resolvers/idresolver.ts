import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot} from '@angular/router';
import { Vehicle,VehiclesService } from 'app/core/services/api.client.generated';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class IdResolver implements Resolve<Vehicle> {
   

  constructor(private vehicleService: VehiclesService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Vehicle> {
    return this.vehicleService.getVehicle(route.params.id);
  }
}
