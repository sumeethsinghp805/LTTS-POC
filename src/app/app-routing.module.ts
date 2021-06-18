import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProductComponent } from '../app/all-product/all-product.component';
import { AddProductComponent } from '../app/add-product/add-product.component';


const routes: Routes = [
  {path: '', redirectTo: 'all-product', pathMatch: 'full'},
  {path: 'all-product', component: AllProductComponent},
  {path: 'add-product', component: AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
