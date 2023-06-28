import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SubjectPropertyEditComponent } from './subject-property-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, HomePageRoutingModule, FormsModule],
  declarations: [HomePage, SubjectPropertyEditComponent],
})
export class HomePageModule {}
