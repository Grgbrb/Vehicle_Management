import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Vehicle, VehiclesService } from 'app/core/services/api.client.generated';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() vehicle: Vehicle;
  hasBaseDropZoneOver = false;
  uploader:FileUploader;
  photo:Photo;
  
  constructor(private vehicleService: VehiclesService,private router:Router) {
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any) {
    this.hasBaseDropZoneOver = e;
  } 

  deletePhoto(photoId: number,id:number){
     this.vehicleService.DeletePhoto(photoId,id).subscribe(() => { 
      this.vehicle.photos =  this.vehicle.photos.filter(x=>x.id !== photoId);
    })
  } 

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.vehicleService.baseUrl + '/api/Vehicles/add-photo?id=' + this.vehicle.id,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      autoUpload: false,
      maxFileSize: 10* 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response) =>{
      if (response){
        console.log(response);
        const photo : Photo = JSON.parse(response);
        this.vehicle.photos.push(photo);
      }
      this.router.navigateByUrl('/vehicles');

    }
  }
}



