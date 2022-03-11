import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehiclesService } from 'app/core/services/api.client.generated';
import { Pagination } from 'app/_models/pagination';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class HeaderInject {
  private url = this.vehicleService.baseUrl + '/api/vehicles';
  headers: any;
  pagination: Pagination;
  totalItems: any;


  constructor(private vehicleService: VehiclesService,private http: HttpClient) { }


  getConfigResponse(): Observable<HttpResponse<Pagination>> {
    return this.http.get<Pagination>(
        this.url, { observe: 'response',responseType:'json' });
  }

  showConfigResponse() {
    this.getConfigResponse().subscribe(response =>{
        const keys = response.headers.keys();
        this.headers = keys.map(keys =>
            `${keys}: ${response.headers.get(keys)}`
        );
        
        this.headers =  JSON.parse(response.headers.get('Pagination'));
        this.totalItems = this.headers.totalItems;
        localStorage.setItem('totalitems',JSON.stringify(this.totalItems)); 
    });
  }
}


