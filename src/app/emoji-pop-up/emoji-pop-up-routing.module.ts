import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmojiPopUPPage } from './emoji-pop-up.page';

const routes: Routes = [
  {
    path: '',
    component: EmojiPopUPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmojiPopUPPageRoutingModule {}
