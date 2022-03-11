import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './vehicle/edit-vehicle/edit-vehicle.component';
import { PhotoEditorComponent } from './vehicle/photo-editor/photo-editor.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { IdResolver } from './_resolvers/idresolver';

const routes: Routes = [ 
  {path:'',component: AppComponent},
  {path:'',
    children:[
    {path:'vehicles',component: VehicleComponent},
    {path:'add-vehicle',component: AddVehicleComponent},
    {path:'edit-vehicle/:id',component: EditVehicleComponent,resolve:{vehicle:IdResolver}}
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
