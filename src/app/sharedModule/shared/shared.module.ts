import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from './drop-down/drop-down.component';

@NgModule({
  declarations: [DropDownComponent],
  imports: [
    CommonModule
  ],
  exports:[DropDownComponent],
  bootstrap: []
})
export class SharedModule { }
