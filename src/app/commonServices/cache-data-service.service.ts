import { Injectable } from '@angular/core';
import { ProductList } from '../commonInterface/app-interface';

@Injectable({
  providedIn: 'root'
})
export class CacheDataServiceService {

  constructor() { }

  private productList :ProductList[]=[];

  getProductList()
  {
    return this.productList;
  }


  setProductList(list:ProductList[])
  {
     this.productList = list;
  }

  

}
