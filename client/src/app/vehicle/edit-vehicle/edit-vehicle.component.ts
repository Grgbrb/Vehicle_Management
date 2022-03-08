import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vehicle,VehiclesService } from 'app/core/services/api.client.generated';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  registerForm: FormGroup;
  vehicle: Vehicle
  id:number;

  constructor(private vehicleService: VehiclesService, private route: ActivatedRoute,
    private toastr: ToastrService) { }
 

    ngOnInit()        
    {
      this.route.params.subscribe(params =>{
        console.log(params);
        this.id = params.id;
        console.log(this.id);
      });
      this.loadvehicle(this.id);
    }    
  
    loadvehicle(id:number){   
    this.vehicleService.getVehicle(this.id).subscribe(response => {
      this.vehicle = response;
      })
    }

    updateVehicle(){
      this.vehicleService.updateVehicle(this.vehicle).subscribe( response =>{
        this.toastr.success('Vehicle Updated Succesfully');
        this.editForm.reset(this.vehicle);
      })
    } 
}
