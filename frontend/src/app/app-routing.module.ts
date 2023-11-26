import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'user-edit/:id',
    loadChildren: () =>
      import('./user-edit/user-edit.module').then((m) => m.UserEditPageModule),
  },
  {
    path: 'topic/:id',
    loadChildren: () =>
      import('./topic/topic.module').then((m) => m.TopicPageModule),
  },
  {
    path: 'topic-edit/:id',
    loadChildren: () =>
      import('./topic-edit/topic-edit.module').then(
        (m) => m.TopicEditPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
