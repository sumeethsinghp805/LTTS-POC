import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ApiServicesService} from './commonServices/api-services.service';
import { CacheDataServiceService } from './commonServices/cache-data-service.service';

import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FirstProductApp';

  constructor(private api: ApiServicesService, private cache: CacheDataServiceService, private router: Router){}

  ngOnInit(){
    this.api.getDropDownConfig().subscribe(value => {
      this.cache.setConfig(value);
    })
  }

}
