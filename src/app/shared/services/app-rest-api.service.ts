import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { ApiResponse } from './errors/ApiResponse';
import { Observable, throwError } from 'rxjs';
import { ErrorModel } from '../models/error.model';
import { Utils } from '../common/utlis';
import { SuccessModel } from '../models/success.model';
import { APPUrlProviderService } from './errors/app-url-provider.service';
import { appConstant } from '../common/app-constant';

@Injectable({
  providedIn: 'root'
})
export class AppRestApiService {

  constructor(private http: HttpClient ) { }

  getSmartBoxResults(route: string) {
    let url = APPUrlProviderService.getSmartBoxResult(route);
    return this.http.get(url).pipe(map((res: ApiResponse) => this.successHandler(res)), catchError(this.handleError));
  }

  getSmartBoxContents(appText:string, src:string, sbName:string, source:string, nlpResult:any, optionalData?: any) {
    let url = APPUrlProviderService.getSmartBoxContents(appText, src, '', sbName, source, nlpResult, optionalData);
    return this.http.get(url).pipe(map((res: ApiResponse) => this.successHandler(res)), catchError(this.handleError));
  }

  getSmartBoxActionContents(sbName: string, requestType: string, payload?: any) {
    let url = APPUrlProviderService.getSmartBoxActionContents(sbName);
    if(requestType === 'post') {
      return this.http.post(url, payload).pipe(map((res: ApiResponse) => this.successHandler(res)), catchError(this.handleError));
    }
    return this.http.get(url).pipe(map((res: ApiResponse) => this.successHandler(res)), catchError(this.handleError));
  }

  loadAppConfig(){
    let url="assets/data/app-config.json"
    return this.http.get(url).pipe(map((res:any)=>res));

  }

  loadEmploymentCertificateConfig() {
    return this.http.get(appConstant.employmentCertificateConfig[Utils.getEnv()]).pipe(map((res: ApiResponse) => this.successHandler(res)), catchError(this.handleError));
  }

  loadUserInfo() {
    return this.http.get(appConstant.userInfo[Utils.getEnv()]).pipe(map((res: ApiResponse) => this.successHandler(res)), catchError(this.handleError));
  }


  private successHandler(res) {
    return res ? new SuccessModel(res) : {};
  }

  private handleError(error:HttpErrorResponse):Observable<never>
  {
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      console.log(error.error.message);
    } else {
      // Get server-side error
      console.error(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }
    return throwError(new ErrorModel(error.status));
 }

}

