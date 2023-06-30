import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestTHisPage } from './test-this.page';

const routes: Routes = [
  {
    path: '',
    component: TestTHisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestTHisPageRoutingModule {}
