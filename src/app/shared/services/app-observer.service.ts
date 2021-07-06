import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppObserverService {
  private facetSource = new BehaviorSubject<string>("");
  private smartBoxNotifier = new BehaviorSubject<string>("");

  private messageSource = new BehaviorSubject<string>("");

  private appRouteSubscription = new BehaviorSubject<string>("");
  currentSourceFacet = this.facetSource.asObservable();
  smartBox = this.smartBoxNotifier.asObservable().pipe(debounceTime(150));
  currentAppRoute = this.appRouteSubscription.asObservable();

  constructor() { }

  updateSourceFacet(facet: string) {
    if(!facet) {return;}
    this.facetSource.next(facet);
  }
}
