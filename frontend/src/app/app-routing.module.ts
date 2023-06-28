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
    path: 'user-edit/:id',
    loadChildren: () =>
      import('./user-edit/user-edit.module').then((m) => m.UserEditPageModule),
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./user-list/user-list.module').then((m) => m.UserListPageModule),
  },
  {
    path: 'topic-list',
    loadChildren: () =>
      import('./topic-list/topic-list.module').then(
        (m) => m.TopicListPageModule
      ),
  },
  {
    path: 'topic-edit/:id',
    loadChildren: () =>
      import('./topic-edit/topic-edit.module').then(
        (m) => m.TopicEditPageModule
      ),
  },
  {
    path: 'subject-list',
    loadChildren: () =>
      import('./subject-list/subject-list.module').then(
        (m) => m.SubjectListPageModule
      ),
  },
  {
    path: 'subject-edit/:id',
    loadChildren: () =>
      import('./subject-edit/subject-edit.module').then(
        (m) => m.SubjectEditPageModule
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
