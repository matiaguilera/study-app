import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicPage } from './topic.page';

import { IonicModule } from '@ionic/angular';

import { TopicEditPageRoutingModule } from './topic-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TopicEditPageRoutingModule],
  declarations: [TopicPage],
})
export class TopicPageModule {}
