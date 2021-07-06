import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

declare var _ : any;
declare var $ : any;

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css'],
  inputs : ['dataList', 'pages', 'pageSize']
})
export class PagerComponent implements OnInit {

    public pages : number;
    public pageSize : number;
    public pageNumber : number = 0;
    public currentIndex : number = 1;
    public pagesIndex : Array<number>;
    public pageStart : number = 1;
    public selArr = new Array();
    public filteredDataList : any;
    public perviousColumnIndex : number = 1;
    public dataList : any;
    public defaultPages : number;
    public isPager : boolean = false;
    constructor() {
    }
    
    @Output()
    onChange: EventEmitter<number> = new EventEmitter<number>();

   /*********************************************************************************
    *                               PRIVATE MEMBERS
    ***********************************************************************************/

    private configurePagination() {
        this.clearDefaultSettings();
        this.pageNumber = parseInt("" + (this.dataList.length / this.pageSize));
        if (this.dataList.length % this.pageSize != 0 && this.pageSize > this.pageNumber) {
            this.pageNumber ++;
        }
    
        if (this.pageNumber  < this.pages) {
              this.pages =  this.pageNumber;
        }
        this.refreshItems();
    }
    
    /*
    * clears all default settings
    */
    private clearDefaultSettings() {
        this.currentIndex = 1;
        this.pageStart = 1;
        this.pages = this.defaultPages;
    }

    private fillArray (): any {
        var obj = new Array();
        for(var index = this.pageStart; index < this.pageStart + this.pages; index ++) {
            obj.push(index);
        }
        return obj;
    }

    private refreshItems () {
        let filteredDataList = this.dataList.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
        this.pagesIndex =  this.fillArray();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        this.onChange.emit(filteredDataList);
        // this.filteredDataList = Object.assign({}, tempDataList);
    }

    private prevPage () {
        if (this.currentIndex>1) {
          this.currentIndex --;
        } 
        if (this.currentIndex < this.pageStart) {
          this.pageStart = this.currentIndex;
        }
        this.refreshItems();
    }

    private nextPage () {
        if (this.currentIndex < this.pageNumber) {
              this.currentIndex ++;
        }
        if (this.currentIndex >= (this.pageStart + this.pages)) {
          this.pageStart = this.currentIndex - this.pages + 1;
        }

        this.refreshItems();
    }
  
    private setPage (index : number){
        this.currentIndex = index;
        this.refreshItems();
    }

   /*********************************************************************************
    *                               PUBLIC MEMBERS
    ***********************************************************************************/
    updatePagination(data : any) {
        this.dataList = data;
        this.configurePagination();
    }
    ngOnInit() {
        let self = this;
        if (!this.dataList) { return; }
        if (this.pages) {
            this.defaultPages = this.pages;
        }
        this.updatePagination(this.dataList);
        setTimeout(function() {
            self.isPager = true;
        });
    }

}

