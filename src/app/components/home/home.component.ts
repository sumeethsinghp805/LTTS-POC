import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRestApiService } from '@app/shared/services/app-rest-api.service';
import { SettingsService } from '@app/shared/services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public appConfig: any = {};
  constructor(private route:ActivatedRoute,private _appService: AppRestApiService) { }

  isAppconfigLoaded:boolean = false;

  private onLoadAppConfig(){
    this._appService.loadAppConfig().subscribe(
      (resp:any)=>{
        SettingsService.setAppConfig(resp);
        this.isAppconfigLoaded= true;
        console.log(resp)
      },(err: any)=>{
        console.log(err)
      }
    );
  }
//user check is required.

  ngOnInit(): void {
    this.onLoadAppConfig();
    console.log(SettingsService.getAppConfig());
    this.appConfig = SettingsService.getAppConfig();
  }

}
