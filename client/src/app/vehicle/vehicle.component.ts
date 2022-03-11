import { Component, OnInit } from '@angular/core';
import { Photo, VehiclesService } from 'app/core/services/api.client.generated';
import { HeaderInject } from 'app/core/services/headerinject';
import { Pagination } from 'app/_models/pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit {
  vehicles:any;
  pageNumber: number;
  pageSize:number;
  currentPage = 1;
  pagination: Pagination;
  totalItems:number;
  photo:Photo;

  constructor(private vehicleService: VehiclesService,private toastr: ToastrService,private headerInject: HeaderInject ) { 
  }

  ngOnInit(): void {
    this.totalItems= JSON.parse(localStorage.getItem('totalitems'));
    this.gettotalitems();
    this.getCars();
}
 
  private gettotalitems(){
    this.headerInject.showConfigResponse();
    }
 
  deleteCar(id: number){
    this.vehicleService.deleteVehicle(id).subscribe(() => {
    this.getCars();
    this.toastr.warning('Vehicle Deleted Succesfully');
    });
  }

  getCars(){
    this.vehicleService.getVehicles(this.pageNumber,this.pageSize).subscribe(response =>{
      this.vehicles = response;
      console.log(response)
    });
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.getCars();
  }
}


