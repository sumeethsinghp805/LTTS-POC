import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigModel, FacetModel, FacetDropDownModel } from '@app/shared/models/app-config-model';
import { SettingsService } from '@app/shared/services/settings.service';
import { AppObserverService } from '@app/shared/services/app-observer.service';
import { UserInfoModel } from '@app/shared/models/user-info.model';
import { Subscription } from 'rxjs';
import { ResizeService } from '@app/shared/services/resize.service';

declare var _:any;
declare var $:any;


@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.css']
})
export class FacetsComponent implements OnInit {

  public facetsList: FacetModel;
  public sourceFacet: string;
  public appConfig: AppConfigModel;
  // public userInfo: UserInfoModel;
  public moreFacetsList: FacetModel[] = [];
  public updatedFacets: FacetModel[] = [];
  public canShowMoreList: boolean = false;
  public facetDropList: FacetDropDownModel[] = [];

  public userInfo: UserInfoModel;

  public appTxt:string;

  public appTxtChangeSubscription:any;
  public scrHeight;
  public scrWidth;
  private resizeSubscription: Subscription;

  public facetSource: any;

  public facetTemplateConfig: any;


  constructor(
    private router: Router,
    private observerService: AppObserverService,) { }

  ngOnInit() {
    let self = this;
    this.appConfig = SettingsService.getAppConfig();
    this.facetSource = this.appConfig['appCommon'].facetsConfig;
    this.facetsList = this.appConfig['appCommon'].facetsConfig;
    this.facetDropList = this.appConfig['navDropConfig'];
    console.log(this.facetDropList)
    this.userInfo = SettingsService.getUserInfo();
    this.sourceFacet = this.router.url.split(";")[0].split("/")[2];
    if (!this.sourceFacet) {
      this.router.navigate(['/'+this.facetsList[0].route])
      this.sourceFacet = this.facetsList[0].route;
    }
  }

  //callback for standard template dropdown change
  public onChangeOfStandardTemplDropDown(data) {
    console.log(data);
    this.router.navigate(['/'+data.dropDownVal]);
  }
  ngOnDestroy() {
    this.appTxtChangeSubscription.unsubscribe();
  }
}

