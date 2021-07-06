import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  private static smartBox = {};
  private static cachedAppQuery = [];

  constructor() { }

  static setSmartBoxResults(appTxt, src,results){
    this.setToCache(this.smartBox,appTxt,src,results);
  }

  static getSmartBoxResults(appTxt, src){
    return this.smartBox[appTxt]?this.smartBox[appTxt][src]:'';
  }

  static setToCache(obj,appTxt,src,results){
    if(this.cachedAppQuery.length > 5 ){
      let popedQuery = this.cachedAppQuery.shift();
      delete obj[popedQuery];
    }else if(this.cachedAppQuery.indexOf(appTxt) ===-1){
      this.cachedAppQuery.push(appTxt)
    }

    obj[appTxt] = obj[appTxt] || {};
    obj[appTxt][src] = results;
  }
}
