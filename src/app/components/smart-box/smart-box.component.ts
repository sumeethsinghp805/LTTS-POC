import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AppRestApiService } from '@app/shared/services/app-rest-api.service';
import { SettingsService } from '@app/shared/services/settings.service';
import { SmartBoxService } from '@app/shared/services/smart-box.service';
import { AppObserverService } from '@app/shared/services/app-observer.service';
import { CachingService } from '@app/shared/services/caching.service';
import { AppConfigModel } from '@app/shared/models/app-config-model';
import { Utils } from '@app/shared/common/utlis';
import {Platform} from '@angular/cdk/Platform';
import { HostListener } from "@angular/core";
import { RestPayload } from '@app/shared/models/rest-payload.model';

declare var _: any;

declare var $: any;

@Component({
  selector: 'smart-box',
  templateUrl: './smart-box.component.html',
  styleUrls: ['./smart-box.component.css']
})
export class SmartBoxComponent implements OnInit {

  private smartboxSubscription;
  public appText: string;
  public smartBoxResults: any;
  public appConfig: AppConfigModel;
  public smartBoxConfig: any;
  public smartboxTemplateConfig: any;
  public smartboxContents: any;
  public sbComponentData: any;
  public userInfo: any;
  public activeRoutedPage: string;
  public smartboxOptionalParam: any = {};
  public smartboxActionContents: any;
  public screenWidth: number;

  public appRouteSubscription:any;

  @ViewChild('smartBoxStandardComp') smartBoxStandardComp: any;
  @ViewChild('smartBoxGridComp') smartBoxGridComp: any;
  @ViewChild('smartboxCounterComp') smartboxCounterComp: any;
  @ViewChild('reloadChart') reloadChart: any;

  @HostListener('window:resize', ['$event'])
onResize(event?) {
   this.screenWidth = window.innerWidth;
} 

private appResults;

  constructor(
    private _appRestService: AppRestApiService,
    private observerService: AppObserverService,
    private route: ActivatedRoute,
    private router: Router,
    private elem: ElementRef,

    private smartBoxService: SmartBoxService,
    private Platform : Platform) {
      console.log(this.Platform);
    this.onResize(); }

  private configureSmartBoxResults() {
    let self = this;
    this.smartboxOptionalParam = {};
    this.smartboxSubscription = this.observerService.smartBox.subscribe(appText => {
      this.appText = appText;

      //this gets executed for all other smartboxes
      if (appText) {

        let cachedResults = CachingService.getSmartBoxResults(this.appText, this.route.snapshot.data['src']);
        console.log(cachedResults);
        this.appResults = SettingsService.getAppResult();
        //if there already data cached for given keyword
        if (cachedResults) {
          this.smartBoxResults = cachedResults;
          this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
          SettingsService.setAllRecordsCount('smartbox', this.smartBoxResults.name);
          this.updateSmartboxPrerequisites();
        } else {
          // gets executed for new route  which are not available in cache mem
          let appResult = SettingsService.getAppResult();
          let appTerm = appResult.appTerms;
            let smartBoxappTerm = (appResult.classifierClassName && appResult.classifierClassName !== 'generic' && appResult.classifierClassName !== 'hr_employee_profile') ? appResult.classifierClassName : appTerm;
            //app based on the nlp result 
            this.tiggerSmartBoxapp(smartBoxappTerm);
        }
        return;
      }
      this.clearSettings();
    });

    this.appRouteSubscription = this.observerService.currentAppRoute.subscribe(appText => {
      this.clearSettings();
    });
  }

  private fetchSmartBoxContents(source: string, sbName: string, appTxt: string) {
    let self = this;
    let appResult = SettingsService.getAppResult();
    this._appRestService.getSmartBoxContents(appTxt, source, sbName, self.smartboxTemplateConfig.source, appResult, this.smartboxOptionalParam)
    .subscribe((resp: any) => {
      if (resp.data) {
        //need to check this
        let sbContents = resp.data;

        self.smartboxContents = self.smartBoxService.getSmartBoxTemplateModel(sbName, sbContents, self.smartboxTemplateConfig, this.sbComponentData, this.activeRoutedPage, this.smartBoxResults,appTxt);
        //updates the smartbox components on each new results set
        self.updateSmartboxComponents();

      } else {
        self.smartboxContents = '';
      }
    },
      err => {
      })
  }

  private fetchSmartboxActionContents(sbName, data) {
    let payloadlModel = new RestPayload(data, SettingsService.getUserInfo());
    let restPayload = payloadlModel.getRestPayload(sbName);
    this._appRestService.getSmartBoxActionContents(sbName, 'get', restPayload).subscribe((resp: any) => {
      if (resp.data) {
        let sbActionContents = resp.data;
        this.smartboxActionContents = this.smartBoxService.getSmartBoxActionContentModel(sbName, sbActionContents, this.smartboxTemplateConfig.action);
        console.log("smartbxcont::" + this.smartboxActionContents);
      } else { }
    },
      err => {
      })
  }

  private updateSmartboxComponents() {
    let self = this;
    //Standard Template update
    if (self.smartBoxStandardComp) {
      self.smartBoxStandardComp.updateComponent(self.smartboxContents);
    }

    //Grid Template update
    if (self.smartBoxGridComp) {
      self.smartBoxGridComp.updateComponent(self.smartboxContents);
    }

    //Counter Template update
    if (self.smartboxCounterComp) {
      self.smartboxCounterComp.updateComponent(self.smartboxContents);
    }

    //chart Template update
    if (self.reloadChart) {
      console.log(self.smartboxContents);
      self.reloadChart.updateComponent(self.smartboxContents);
    }
  }

  private tiggerSmartBoxapp(appTxt) {
    let self = this;
    this._appRestService.getSmartBoxResults(appTxt)
      .subscribe(
        (resp: any) => {
          // Success Response
          self.smartboxContents = '';
          self.smartBoxResults = resp.data;
          if (self.smartBoxResults) {
            self.smartboxTemplateConfig = self.smartBoxConfig[self.smartBoxResults.name];
            SettingsService.setAllRecordsCount('smartbox', self.smartBoxResults.name);
            CachingService.setSmartBoxResults(this.appText, this.route.snapshot.data['src'], self.smartBoxResults);
            self.updateSmartboxPrerequisites();

          } else {
              return;
          }
        },
        err => {
          // Log errors if any
          SettingsService.setAllRecordsCount('smartbox', '');
          this.clearSettings();
        });
  }

  private updateSmartboxPrerequisites() {
    this.processSmartboxContentsConfig();

  }

  processSmartboxContentsConfig() {
    let self = this;
    self.smartboxContents = self.smartBoxService.getSmartBoxTemplateModel(self.smartBoxResults.name, '', self.smartboxTemplateConfig, this.sbComponentData, this.activeRoutedPage);
  }

  private renderSmartbox(name) {
    this.smartBoxResults = { name: name };
    this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
    this.updateSmartboxPrerequisites();
  }

  private clearSettings() {
    this.smartboxContents = '';
    this.smartBoxResults = [];
    this.sbComponentData = '';
  }

  public onButtonClickOfStandardTemplate(data) {
    this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
    if (this.smartboxTemplateConfig) {
      this.fetchSmartboxActionContents(this.smartBoxResults.name, data);
    }
  }
  //callback for standard template dropdown change
  private onChangeOfStandardTemplDropDown(data) {
    this.sbComponentData = data;
    let appText;
    this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
    //gets the filtered drop down list based on the the year and it applies only for quaterly smartbox 
      appText = data.dropDown1Val + data.dropDown2Val;
    if (this.smartboxTemplateConfig) {
      this.fetchSmartBoxContents(this.smartboxTemplateConfig.src, this.smartBoxResults.name, appText);
    }
  }

  //callback for grid template dropdown change
  private onChangeOfGridTemplDropDown(data) {
    this.sbComponentData = data;
    let configParam = data.dropDown1Val || '' + data.dropDown2Val || '';
    this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
    if (this.smartboxTemplateConfig) {
      // this.smartboxTemplateConfig.gridConfig.param = configParam;
      this.fetchSmartBoxContents(this.smartboxTemplateConfig.src, this.smartBoxResults.name, this.appText);
    }
  }

   //callback for chart template dropdown change
   private onChangeOfChartTemplDropDown(data) {
    this.sbComponentData = data;
    let configParam = data.dropDownVal;
    this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
   // this.reloadChart.updateComponent("");
    if (this.smartboxTemplateConfig) {
      this.fetchSmartBoxContents(this.smartboxTemplateConfig.src, this.smartBoxResults.name, configParam);
    }
  }

  //callback for counter template dropdown change
  private onChangeOfCounterTemplDropDown(data) {
    this.sbComponentData = data;
    let configParam = data.dropDown1Val || '' + data.dropDown2Val || '';
    this.smartboxTemplateConfig = this.smartBoxConfig[this.smartBoxResults.name];
    if (this.smartboxTemplateConfig) {
    }
    this.fetchSmartBoxContents(configParam, this.smartBoxResults.name, this.appText);
  }

  public onCloseNotification() {
    if (this.smartboxActionContents && this.smartboxActionContents.notification) {
      this.smartboxActionContents.notification.msg = '';
    }
  }

  ngOnInit() {

    this.userInfo = SettingsService.getUserInfo();

    
    this.activeRoutedPage = this.route.snapshot.data['isNotMob'] ? 'overlay' : this.router.url.split(":")[0].split("/")[1];

    //gets the app configuration to dynamically DOM creation of a component
    this.appConfig = SettingsService.getAppConfig();

    this.smartBoxConfig = this.appConfig['smartbox'];
    console.log(this.smartBoxConfig)
    this.sbComponentData = '';

    this.configureSmartBoxResults();
  }

  ngOnDestroy() {
    if (this.smartboxSubscription) {
      this.smartboxSubscription.unsubscribe();
    }
    this.appRouteSubscription.unsubscribe();
  }
}
