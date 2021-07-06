import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '@app/shared/services/settings.service';
import { AppRestApiService } from '@app/shared/services/app-rest-api.service';

declare var $: any;
declare var _: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public isAppConfigLoaded: boolean = false;
  public svgIds: any;
  public svgContent: any;

  constructor(private _appRestService: AppRestApiService, private elem: ElementRef) { }

  private onloadAppConfig() {
    let self = this;
    this._appRestService.loadAppConfig().subscribe(
      (resp:any) => {
        SettingsService.setAppConfig(resp);
        self.isAppConfigLoaded = true;
      },
      err => {
        console.log(err);
      });
  }
  private loadEmploymentCertificateConfig() {
    this._appRestService.loadEmploymentCertificateConfig().subscribe((resp:any) => {
      SettingsService.setEmploymentCertificate(resp.data);
    });
  }

  ngOnInit() {
    let self = this;
    let userData = sessionStorage.getItem('smartApp:currentUser');
    if (!userData) {
      this._appRestService.loadUserInfo().subscribe(
        (resp:any) => {
          SettingsService.setUserInfo(resp.data);
          sessionStorage.setItem('smartApp:currentUser', JSON.stringify(resp.data));
          self.onloadAppConfig();
        },
        err => {
          console.log(err);
        });
    } else {
      SettingsService.setUserInfo(JSON.parse(userData));
      self.onloadAppConfig();
    }
  }
}
