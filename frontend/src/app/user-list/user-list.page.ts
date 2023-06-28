import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-user-list',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
        <ion-title> Usuarios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="usuarios">
      <ion-card>
        <ion-list>
          <ion-item *ngFor="let usuario of usuarios">
            <ion-label [routerLink]="'/user-edit/' + usuario.id"
              >{{ usuario.id }} - {{ usuario.name }} -
              {{ usuario.last_name }}</ion-label
            >
            <ion-icon
              slot="end"
              name="create"
              [routerLink]="'/user-edit/' + usuario.id"
            />
            <ion-icon
              (click)="confirmDelete(usuario.id)"
              slot="end"
              name="trash"
            />
          </ion-item>
        </ion-list>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button routerLink="/user-edit/0">
          <ion-icon name="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
})
export class UserListPage {
  usuarios: any = [];
  token: string | null = '';
  config: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }
    this.config = {
      headers: {
        Authorization: this.token,
      },
    };
    this.getUsers();
  }

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'Desea eliminar el registro?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteUser(id);
          },
        },
        {
          text: 'Cancelar',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  getUsers() {
    axios
      .get('http://localhost:3000/users/list', this.config)
      .then((result) => {
        if (result.data.success) {
          this.usuarios = result.data.usuarios;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteUser(id: any) {
    axios
      .delete('http://localhost:3000/users/delete/' + id, this.config)
      .then((result) => {
        if (result.data.success) {
          this.presentToast('Usuario Eliminado');
          this.getUsers();
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch((error) => {
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
