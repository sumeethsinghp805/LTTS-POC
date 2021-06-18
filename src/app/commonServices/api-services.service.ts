import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProdCategory, ProductList, ProdCategoryItem } from '../commonInterface/app-interface';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CacheDataServiceService } from './cache-data-service.service';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class ApiServicesService {

  productSelect1: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,private cacheService:CacheDataServiceService) { }

  getProdCategory(): Observable<ProdCategory>{
    return this.http.get<ProdCategory>(`${apiUrl}/productCategory`).pipe(retry(1), catchError(this.handleError))
  }

  getAllProductList(): Observable<ProductList>{
    return this.http.get<ProductList>(`${apiUrl}/productList`).pipe(retry(1), catchError(this.handleError))
  }
  
  getCategoryItem(val): Observable<ProdCategoryItem>{
    return this.http.get<ProdCategoryItem>(`${apiUrl}/${val}`).pipe(retry(1), catchError(this.handleError))
  }

  postFormData(formData: ProductList): Observable<ProductList>{
    formData.id = Math.floor(Math.random() * 10000);
    return this.http.post<ProductList>(`${apiUrl}/productList`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError))
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

