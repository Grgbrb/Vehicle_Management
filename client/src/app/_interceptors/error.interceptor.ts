import { Injectable } from '@angular/core';
import {
  HttpRequest, 
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private Router:Router,private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error =>{
        if (error){
        switch (error.status) {
          
          case 400:
            if (error.error.errors){
              const ModalStateErrors =[];
              for (const key in error.error.errors){
                if (error.error.errors[key]){
                  ModalStateErrors.push(error.error.errors[key]);
                }
              }
              throw ModalStateErrors.flat() ;
            } 
            else if (typeof(error.error)==='object'){
                this.toastr.error(error.statusText === 'OK' ? "An error occured"  : error.statusText, error.status);
            }
            
            else{
              this.toastr.error(error.error,error.status);
            }

          break;
        

          case 500:
            const navigationExtras: NavigationExtras = {state: {error:error.error}};
            this.Router.navigateByUrl('/server-error',navigationExtras);
            this.toastr.error(error.statusText === 'OK' ? 'Internal Server Error' : error.statusText, error.status);
          break;
          default:
            this.toastr.error("Something went wrong");
            console.log(error);
            break;
        }
      }
      return throwError(error); 
      })
    )
  }
}
