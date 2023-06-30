import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfessPage } from './confess.page';

const routes: Routes = [
  {
    path: '',
    component: ConfessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfessPageRoutingModule {}
