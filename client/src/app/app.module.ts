import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MotorcycleComponent } from './motorcycle/motorcycle.component';
import { VehicleComponent} from './vehicle/vehicle.component';
import { VehiclesService } from './core/services/api.client.generated';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './_text-input/text-input/text-input.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { EditVehicleComponent } from './vehicle/edit-vehicle/edit-vehicle.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MotorcycleComponent,
    VehicleComponent,
    AddVehicleComponent,
    TextInputComponent,
    EditVehicleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    PaginationModule.forRoot(),
    
  ],
  providers: [VehiclesService,
    {provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
