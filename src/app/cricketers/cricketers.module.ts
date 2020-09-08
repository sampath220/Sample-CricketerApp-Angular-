import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CricketersRoutingModule } from './cricketers-routing.module';
import { CricketersComponent } from './cricketers.component';
import { DisplayCricketersComponent } from './display-cricketers/display-cricketers.component';
import { AddCricketerComponent } from './add-cricketer/add-cricketer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CricketersComponent, DisplayCricketersComponent, AddCricketerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CricketersRoutingModule
  ],
})
export class CricketersModule { }
