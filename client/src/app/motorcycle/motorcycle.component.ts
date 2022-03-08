import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiException } from 'app/core/services/api.client.generated';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html',
  styleUrls: ['./motorcycle.component.css']
})
export class MotorcycleComponent implements OnInit {
  motorcycles:any;

  constructor(private http:HttpClient,private apiclient: ApiException) { }

  ngOnInit(): void {
    this.getMotorcycles();
    
  }
  getMotorcycles(){
    this.http.get('https://localhost:7009/api/motorcycles').subscribe( response => {
      this.motorcycles = response;
   });
 }

 

}
