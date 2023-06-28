import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubjectEditPage } from './subject-edit.page';
import { IonicModule } from '@ionic/angular';
import { SubjectEditPageRoutingModule } from './subject-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectEditPageRoutingModule,
  ],
  declarations: [SubjectEditPage],
})
export class SubjectEditPageModule {}
