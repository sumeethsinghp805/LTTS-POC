import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ApiServicesService } from '../commonServices/api-services.service';
import { NumToWordPipe } from '../commonPipe/num-to-word.pipe';
import { CacheDataServiceService } from '../commonServices/cache-data-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categoryList: any;
  newProduct: FormGroup;
  checkNumRegex: '/^-?(0|[1-9]\d*)?$/';
  dropDownLbl = "Product Category2";
  dropDownVal: string;
  valueEmittedChild: string = '';
  configData: any;

  constructor(private route: Router, private api: ApiServicesService, private fb: FormBuilder, private cache: CacheDataServiceService) { }

  ngOnInit(): void {
    this.configData = this.cache.getConfig();
    if(this.configData === undefined){
      this.route.navigateByUrl('/all-product');
    }

    this.api.getProdCategory().subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList);
    });

    this.newProduct = this.fb.group({
      prodName: ['', [Validators.required]],
      prodCategory1: ['', [Validators.required]],
      prodCategory2: [''],
      prodDescTxt: ['', [Validators.required]],
      prodSoldType: ['', [Validators.required]],
      prodAmount: ['', [Validators.required, Validators.max(9999), Validators.min(1), Validators.pattern("^[0-9]*$")]],
      verifyProd: ['']
    })
  }

  get f(){
    return this.newProduct.controls;
  }

  onChangeValue(event){
    event.preventDefault();
    this.dropDownVal = event.target.value;
    this.api.productSelect1.next(this.dropDownVal);
  }

  directToProdList(){
    this.route.navigate(['/all-product']);
  }

  onSubmit(formValue){
    //alert('Submit is Working');
    if (this.newProduct.invalid) {
      return;
  }
    formValue.prodCategory2=this.valueEmittedChild;
    this.api.postFormData(formValue).subscribe(data => {
      console.log(data);
      this.directToProdList();

    });
    //console.log(formValue);
    this.newProduct.reset();
  }

  checkTxtValue(event){

  }

  parentEventHandler(valueEmitted){
    this.valueEmittedChild = valueEmitted;
}

}
