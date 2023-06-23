import { Component, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<ion-router-outlet></ion-router-outlet>
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Study App</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrarSesion()">
            <ion-icon name="log-out-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-refresher slot="fixed" (ionRefresh)="refresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-content [fullscreen]="true" *ngIf="temas">
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button [routerLink]="'/topic-list'">
            <ion-icon name="document-text-outline"></ion-icon>
            Topicos
          </ion-tab-button>
          <ion-tab-button [routerLink]="'/theme-list'">
            <ion-icon name="document-text-outline"></ion-icon>
            Temas
          </ion-tab-button>
          <ion-tab-button [routerLink]="'/user-list'">
            <ion-icon name="person-circle-outline"></ion-icon>
            Usuarios
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
      <ion-card>
        <ion-accordion-group>
          <!-- Impresion de tema -->
          <ion-accordion *ngFor="let tema of temas">
            <ion-item slot="header" color="light">
              <ion-label
                >{{ tema.id }} - {{ tema.name }} -
                {{ tema.description }}</ion-label
              >
            </ion-item>
            <!-- Impresion de propiedades del tema -->
            <div
              *ngFor="let tema_propiedad of temas_propiedades"
              slot="content"
            >
              <label
                *ngIf="tema_propiedad.theme_id === tema.id"
                class="ion-padding"
              >
                {{ tema_propiedad.theme_id }} -
                {{ tema_propiedad.property_name }}
              </label>
            </div>

            <!-- Boton para agregar propiedad -->
            <div class="ion-padding" slot="content">
              <ion-icon slot="end" size="large" name="add-circle"></ion-icon>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-card>
    </ion-content> `,
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  temas: any = [];
  temas_propiedades: any = [];

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ionViewWillEnter(): void {
    //verificar si el usuario no esta logueado
    let token = localStorage.getItem('token');
    //localStorage.removeItem("token");
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.getThemes();
    this.getThemesProperties();
  }

  cerrarSesion() {
    let token = localStorage.getItem('token');
    let data = '';
    let config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .post('http://localhost:3000/user/logout', data, config)
      .then(async (result) => {
        console.log('aber', config);
        if (result.data.success == true) {
          console.log('qlqpasa');
          localStorage.removeItem('token');
          this.presentToast('Sesion Finalizada');
          this.router.navigate(['/login']);
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
  }

  ngOnInit(): void {}

  getThemes() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/themes/list', config)
      .then((result) => {
        if (result.data.success == true) {
          this.temas = result.data.temas;
        } else {
          console.log(result.data.error);
          this.presentToast(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.presentToast(error.message);
      });
  }

  getThemesProperties() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/themes_properties/list', config)
      .then((result) => {
        if (result.data.success == true) {
          this.temas_propiedades = result.data.themes_properties;
        } else {
          console.log(result.data.error);
          this.presentToast(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
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
