import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfessPageRoutingModule } from './confess-routing.module';

import { ConfessPage } from './confess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfessPageRoutingModule
  ],
  declarations: [ConfessPage]
})
export class ConfessPageModule {}
