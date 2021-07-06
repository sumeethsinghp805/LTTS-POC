import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FacetModel } from '@app/shared/models/app-config-model';
import { ResizeService } from '@app/shared/services/resize.service';
import { copyFileSync } from 'fs';
import { Subscription } from 'rxjs';

declare var _:any;
declare var $:any;

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  inputs: ['datasource', 'sbConfig','childDropdownList']
})
export class DropdownComponent implements OnInit {

  public datasource: any;
  public sbConfig: any;
  public dropList: any;
  public dropDownList: any=[];
  public childDropdownList: any=[];

  private resizeSubscription: Subscription;
  public updatedList:any=[];
  public updatedMoreList:any=[];
  public screenWidth:any;
  public moreList: FacetModel[] = [];
  @ViewChildren('genericList') genericList: QueryList<ElementRef>;

  constructor(private sanitizer: DomSanitizer
    ,private resizeService: ResizeService,
    private elem: ElementRef) { }

  @Output()
  onDropDownChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onLinkClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  public dropDownVal: string;
  

  private onSelectDropDown(val) {
    this.dropDownVal = val;
    this.onDropDownChange.emit({ "dropDownVal": this.dropDownVal});
  }

  // replace the clicked facet with the more once.
  private rearrageFacetPosition(id: string, pos: string) {
    if (pos === 'more') {
      let selectedActiveFacet = _.find(this.datasource, { id: id });
      let selectedActiveFacetIndex = _.indexOf(this.dropDownList, selectedActiveFacet);
      let replacedFacet = this.dropDownList[this.dropDownList.length - 1];
      this.dropDownList[this.dropDownList.length - 1] = selectedActiveFacet;
      this.dropList[selectedActiveFacetIndex] = replacedFacet;
    }
  }

  getSanitizedResourceUrl(content) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(content);
  }

  onSmartboxLinkClicks(event, value, label, contentSrc) {
    this.onLinkClick.emit({ label: label, value: value, contentSrc: contentSrc });
    event.stopPropagation();
  }
  
  ngAfterViewChecked() {
    setTimeout(() => {
      var width = 0;
    var count = 0;
    this.moreList = [];
    let tempmoreList = [];
    this.genericList.forEach(element => {
      width += element.nativeElement.offsetWidth;
        if(width < this.screenWidth)
        {
          this.moreList.push(this.datasource[count]);
        }else{
        }
        count++;
    });
    let tempFacetList: any = [];
    tempFacetList = this.datasource;
    this.updatedList = tempFacetList.slice(0, this.moreList.length-1);
    tempmoreList = tempFacetList.slice(this.updatedList.length,tempFacetList.length-1);
    let moreList = tempFacetList.filter(more => more.id === 'more');
    this.dropList.more = tempmoreList;
    this.dropDownList = this.updatedList.concat(moreList);
    }, 100);
}
  updateComponent(data,child) {
    this.dropDownList = data;
    this.dropList= child;
    this.screenWidth= this.screenWidth=== undefined?screen.width:this.screenWidth;
  }
  ngOnInit(): void {
    this.resizeSubscription = this.resizeService.onResize$
      .subscribe(size => {
      this.screenWidth = size.innerWidth;
      this.updateComponent(this.datasource,this.childDropdownList);
    });
    this.updateComponent(this.datasource,this.childDropdownList);
  }
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
