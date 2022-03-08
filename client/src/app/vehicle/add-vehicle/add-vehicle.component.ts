import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiclesService } from 'app/core/services/api.client.generated';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit  {
  @ViewChild('editForm') editForm: NgForm;
  registerForm: FormGroup;
  validationErrors: string[] = [];


  constructor(private vehicleService: VehiclesService, private formbuilder: FormBuilder,
    private router: Router,private toastr: ToastrService) { }
 

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.formbuilder.group({
      color:['',Validators.required],
      model:['',Validators.required],
      maxSpeed:['',Validators.required],
      numberOfDoors:['',Validators.required],
      numberOfWheels:['',Validators.required],
      manufacturer:['',Validators.required],
      vin:['',Validators.required],
      licensePlate:['',Validators.required],
    })
  }

  register(){
    this.vehicleService.createVehicle(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/vehicles');
      this.toastr.success('Vehicle Created Succesfully!');
    },error => { 
      this.validationErrors = error;
    })
  }

  
}
