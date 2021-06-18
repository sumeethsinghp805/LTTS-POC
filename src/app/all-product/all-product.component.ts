import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { ProductList } from '../commonInterface/app-interface';

import { ApiServicesService } from '../commonServices/api-services.service';
import { CacheDataServiceService } from '../commonServices/cache-data-service.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  productList:any;

  constructor(private route: Router, private api: ApiServicesService
    ,private cacheService:CacheDataServiceService) { }

  ngOnInit(): void {
    this.api.getAllProductList().subscribe(data => {
      this.productList = data;
       this.cacheService.setProductList(this.productList); 
      console.log(this.productList);
    })
  }

  directToAddProd(){
    this.route.navigate(['/add-product']);
  }

}
