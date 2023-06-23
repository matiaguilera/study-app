import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-view-message',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            [text]="getBackButtonText()"
            defaultHref="/"
          ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="usuario">
      <ion-item>
        <ion-icon
          aria-hidden="true"
          name="person-circle"
          color="primary"
        ></ion-icon>
        <ion-label class="ion-text-wrap">
          <h2>
            <ion-list>
              <ion-item>{{ usuario.name }}</ion-item>
              <ion-item>{{ usuario.last_name }}</ion-item>
              <ion-item>{{ usuario.email }}</ion-item>
              <ion-item>{{ usuario.password }}</ion-item>
            </ion-list>
          </h2>
        </ion-label>
      </ion-item>
    </ion-content> `,
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario: any = '';

  constructor() {}

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // this.message = this.data.getMessageById(parseInt(id, 10));
    axios
      .get('http://localhost:3000/users/buscarPorCodigo/' + id)
      .then((result) => {
        if (result.data.success == true) {
          this.usuario = result.data.usuario;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }
}
