import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
 } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
 import { catchError, throwError } from "rxjs";
 
 export const ErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
 ) => {

  const toastr = inject(ToastrService);
  
  return next(req).pipe(
   catchError((error: HttpErrorResponse) => {
     if(error){
      switch(error.status) {
        case 400: 
          if(error.error.errors){
            const modelStateErrors = [];
            for(const key in error.error.errors){
              if(error.error.errors[key]){
                modelStateErrors.push(error.error.errors[key]);
              }
            }

            throw modelStateErrors;
          }else{
            toastr.error(error.error);
          }
          break;
        case 401: 
          toastr.error(error.error);
          break;
        case 404: 
          toastr.warning("No data found");
          break;
        case 500: 
          toastr.error(error.error);
          break;
        default:
          toastr.error("Something unexcepted happened, Please contact Admin");
          break;
      }
    }
    return throwError(() => error);
   }),
  );
 };