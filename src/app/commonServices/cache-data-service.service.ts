import { Injectable } from '@angular/core';
import { ProductList } from '../commonInterface/app-interface';

@Injectable({
  providedIn: 'root'
})
export class CacheDataServiceService {

  constructor() { }

  private productList :ProductList[]=[];
  private appConfig :any;

  getProductList()
  {
    return this.productList;
  }
  
  getConfig()
  {
    return this.appConfig;
  }
  
  setConfig(value)
  {
    this.appConfig = value;
  }

  setProductList(list:ProductList[])
  {
     this.productList = list;
  }

}
