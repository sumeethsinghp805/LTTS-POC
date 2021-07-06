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
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
    private observerService: AppObserverService,
    private elem: ElementRef,
    private renderer:Renderer2,
  ) {
  }


  private onSelectFacet(facet: string, pos: string) {
    this.sourceFacet = facet;
    this.canShowMoreList = false;
    this.rearrageFacetPosition(facet, pos);
    this.router.navigate(['/' + facet]);
    this.observerService.updateSourceFacet(facet);
  }

  private onMoreFacet() {
    console.log(this.canShowMoreList);
    this.canShowMoreList = !this.canShowMoreList;
  }

  private rearrageFacetPosition(facet: string, pos: string) {
    if (pos === 'more') {
      let selectedActiveFacet = _.find(this.moreFacetsList, { id: facet });
      let selectedActiveFacetIndex = _.indexOf(this.moreFacetsList, selectedActiveFacet);
      let replacedFacet = this.updatedFacets[this.updatedFacets.length - 1];
      this.updatedFacets[this.updatedFacets.length - 1] = selectedActiveFacet;
      this.moreFacetsList[selectedActiveFacetIndex] = replacedFacet;
    }
  }



  private configureFacetResize(width) {
    
  }


//   getOrientation() {
//     if (window.outerWidth > window.outerHeight) {
//       return 'landscape';
//     return 'portrait';
//   }
// }

  private updateFacetsDisplayPrequisite(facets) {
    let updatedFacets = <any>[];
    let self = this;
    _.each(facets, function (facet) {
      if (facet.visibilityFor === 'all' || facet.visibilityFor === self.userInfo.userDiversion) {
        updatedFacets.push(facet);
      }
    });
    this.facetsList = updatedFacets;
    this.updatedFacets = updatedFacets;
  }

  private updateNavDrpList(facetsDropItem){

  }

  // ngAfterViewInit()
  // {
  //   //setTimeout(()=>this.getScreenSize(),100)
  // }
  ngOnInit() {
    let self = this;
    this.appConfig = SettingsService.getAppConfig();
    this.facetSource = this.appConfig['appCommon'].facetsConfig;
    this.facetsList = this.appConfig['appCommon'].facetsConfig;
    this.facetDropList = this.appConfig['navDropConfig'];
    console.log(this.facetDropList)
    this.userInfo = SettingsService.getUserInfo();
    this.updateFacetsDisplayPrequisite(this.facetsList);
    this.sourceFacet = this.router.url.split(";")[0].split("/")[2];
    if (!this.sourceFacet) {
      this.router.navigate(['/'+this.facetsList[0].route])
      this.sourceFacet = this.facetsList[0].route;
    }

    
    //Triggeres on refresh of browser in order to retain the current page
    window.onbeforeunload = function () {
      console.log(self.appTxt);
      self.router.navigate(['/'+ self.sourceFacet]);
    };

    this.observerService.currentSourceFacet.subscribe(facet => {
      if (!facet || facet === this.sourceFacet) { return; }
      this.sourceFacet = facet;
    });

    this.appTxtChangeSubscription = this.observerService.currentAppRoute.subscribe(appText => {
      this.appTxt = appText;
    });
  }

  ngOnDestroy() {
    this.appTxtChangeSubscription.unsubscribe();
  }
}

