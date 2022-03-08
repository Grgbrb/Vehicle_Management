import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'app/core/services/api.client.generated';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit {
   vehicles:any;

  constructor(private vehicleService: VehiclesService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCars();
  }
  

  deleteCar(id: number){
    
    this.vehicleService.deleteVehicle(id).subscribe(() => {
    this.getCars();
    this.toastr.warning('Vehicle Deleted Succesfully');
  });
}

  getCars(){
    this.vehicleService.getVehicles().subscribe(response =>{
      this.vehicles = response;
    });
  }
  
}


