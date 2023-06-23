import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-theme-edit',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            [text]="getBackButtonText()"
            defaultHref="/"
          ></ion-back-button>
        </ion-buttons>
        <ion-title> {{ accion }} </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="theme">
      <ion-card>
        <ion-item>
          <ion-icon
            aria-hidden="true"
            name="person-circle"
            color="primary"
          ></ion-icon>
          <ion-label class="ion-text-wrap">
            <ion-list>
              <ion-item>
                <ion-input
                  label="Nombre :"
                  label-placement="stacked"
                  placeholder="Ingrese el nombre"
                  [(ngModel)]="theme.name"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Descripcion :"
                  labelPlacement="stacked"
                  placeholder="Ingrese la descripcion"
                  [(ngModel)]="theme.description"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Palabras Clave :"
                  labelPlacement="stacked"
                  placeholder="Ingrese palabras clave"
                  [(ngModel)]="theme.keywords"
                ></ion-input>
              </ion-item>
            </ion-list>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="saveUser()">
          <ion-icon name="save"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
  styleUrls: ['./theme-edit.page.scss'],
})
export class ThemeEditPage implements OnInit {
  public message!: Message;
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  theme: any = '';
  accion = 'Agregar Tema';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    //con este comando se recupera el id que se pasa
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // this.message = this.data.getMessageById(parseInt(id, 10));
    axios
      .get('http://localhost:3000/themes/buscarPorCodigo/' + id, config)
      .then((result) => {
        if (result.data.success == true) {
          if (id !== '0') {
            this.accion = 'Editar Tema';
          }
          if (result.data.theme != null) {
            this.theme = result.data.theme;
          } else {
            this.theme = {};
          }
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

  saveUser() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    var data = {
      id: this.theme.id,
      create_date: fecha,
      name: this.theme.name,
      description: this.theme.description,
      keywords: this.theme.keywords,
      owner_user_id: 1,
    };
    console.log('theme: ', data);
    axios
      .post('http://localhost:3000/themes/update', data, config)
      .then(async (result) => {
        if (result.data.success == true) {
          this.presentToast('Tema Guardado');
          this.router.navigate(['/theme-list']);
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
