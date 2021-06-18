import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { ApiServicesService } from '../../../commonServices/api-services.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  inputs:["datasource","dataLabel","dataValue"]
})
export class DropDownComponent implements OnInit {

  datasource:any;
  dataLabel:any;
  dataValue:any;
  dataList:any;
  constructor(private api: ApiServicesService) { }

  @Output()
  childClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.api.productSelect1.subscribe(value => {
      this.dataValue = value;
      if (this.dataValue) {
        this.api.getCategoryItem(this.dataValue).subscribe(response =>{
          this.dataList = response;
        });
      }
    })
  }

  clickChild(event){
    event.preventDefault();
    this.childClicked.emit(event.target.value);
  }





}
