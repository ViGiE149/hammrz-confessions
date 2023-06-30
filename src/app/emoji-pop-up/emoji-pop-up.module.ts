import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmojiPopUPPageRoutingModule } from './emoji-pop-up-routing.module';

import { EmojiPopUPPage } from './emoji-pop-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmojiPopUPPageRoutingModule
  ],
  declarations: [EmojiPopUPPage]
})
export class EmojiPopUPPageModule {}
