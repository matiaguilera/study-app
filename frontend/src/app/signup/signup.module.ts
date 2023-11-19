import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupPage } from './signup.page';
import { IonicModule } from '@ionic/angular';
import { SignupPageRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignupPageRoutingModule],
  declarations: [SignupPage],
})
export class SignupPageModule {}
