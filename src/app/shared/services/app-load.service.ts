import { Injectable } from '@angular/core';
import { AppRestApiService } from './app-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor(private _appService:AppRestApiService) { }

  //load userdata if available

  loadAppConfig(){
    this._appService.loadAppConfig().subscribe(
      (resp:any)=>{
        console.log(resp)
      },err=>{
        console.log(err)
      }
    );
  }
}
