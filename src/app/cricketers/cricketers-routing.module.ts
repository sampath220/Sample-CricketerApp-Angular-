import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CricketersComponent } from './cricketers.component';

const routes: Routes = [{ path: '', component: CricketersComponent },
{ path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CricketersRoutingModule { }
