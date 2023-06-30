import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestTHisPageRoutingModule } from './test-this-routing.module';

import { TestTHisPage } from './test-this.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestTHisPageRoutingModule
  ],
  declarations: [TestTHisPage]
})
export class TestTHisPageModule {}
