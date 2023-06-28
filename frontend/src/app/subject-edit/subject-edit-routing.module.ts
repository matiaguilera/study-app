import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectEditPage } from './subject-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectEditPageRoutingModule {}
