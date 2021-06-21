import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const configUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})

export class SharedConfigService {

  constructor(private http: HttpClient) { }

  getDropDownConfig(){
    return this.http.get(`${configUrl}/shareConfig`).pipe(retry(1), catchError(this.handleError));
  }

   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
