import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'confess',
    loadChildren: () => import('./confess/confess.module').then( m => m.ConfessPageModule)
  },
  {
    path: 'emoji-pop-up',
    loadChildren: () => import('./emoji-pop-up/emoji-pop-up.module').then( m => m.EmojiPopUPPageModule)
  },
  {
    path: 'help-line',
    loadChildren: () => import('./help-line/help-line.module').then( m => m.HelpLinePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'email-support',
    loadChildren: () => import('./email-support/email-support.module').then( m => m.EmailSupportPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
