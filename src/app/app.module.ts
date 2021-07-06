import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacetsComponent } from './components/facets/facets/facets.component';
import { SmartBoxComponent } from './components/smart-box/smart-box.component';
import { AppSmartBoxComponent } from './shared/components/app-smart-box/app-smart-box.component';
import { AppInfoTemplateComponent } from './shared/components/app-smart-box/app-info-template/app-info-template.component';
import { AppGridTemplateComponent } from './shared/components/app-smart-box/app-grid-template/app-grid-template.component';
import { AppChartTemplateComponent } from './shared/components/app-smart-box/app-chart-template/app-chart-template.component';
import { NgAppGridComponent } from './shared/components/ng-app-grid/ng-app-grid.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppCardTemplateComponent } from './shared/components/app-smart-box/app-card-template/app-card-template.component';
import { AppRestApiService } from './shared/services/app-rest-api.service';
import { HttpsInterceptorService } from './shared/services/https-interceptor.service';
import { AppLoadService } from './shared/services/app-load.service';
import { PagerComponent } from './shared/components/pager/pager.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component'; 

@NgModule({
  declarations: [
    AppComponent,
    FacetsComponent,
    SmartBoxComponent,
    AppSmartBoxComponent,
    AppCardTemplateComponent,
    AppInfoTemplateComponent,
    AppGridTemplateComponent,
    AppChartTemplateComponent,
    NgAppGridComponent,
    HomeComponent,
    PagerComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppRestApiService,
    AppLoadService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:HttpsInterceptorService,
    multi:true
  },
  {
    provide:APP_INITIALIZER,
    useFactory:ConfigInitializer,
    deps: [AppLoadService],
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function ConfigInitializer(loadAppService:AppLoadService){
  return ()=>'';
}
