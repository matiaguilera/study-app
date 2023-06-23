import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-user-list',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            [text]="getBackButtonText()"
            defaultHref="/"
          ></ion-back-button>
        </ion-buttons>
        <ion-title> Usuarios </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="usuarios">
      <ion-card>
        <ion-list>
          <!-- NOMBRE Y APELLIDO DEL USUARIO-->
          <ion-item *ngFor="let usuario of usuarios">
            <ion-label [routerLink]="'/user-edit/' + usuario.id"
              >{{ usuario.id }} - {{ usuario.name }} -
              {{ usuario.last_name }}</ion-label
            >
            <!-- EDITAR USUARIO-->

            <ion-icon
              slot="end"
              name="create"
              [routerLink]="'/user-edit/' + usuario.id"
            ></ion-icon>

            <!-- ELIMINAR USUARIO-->
            <ion-icon
              (click)="confirmDelete(usuario.id)"
              slot="end"
              name="trash"
            >
            </ion-icon>
          </ion-item>
        </ion-list>
      </ion-card>

      <!-- AGREGAR USUARIO-->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button [routerLink]="'/user-edit/0'">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  usuarios: any = [];
  usuario: any = '';
  resDelete = '';
  private platform = inject(Platform);
  isAlertOpen = false;
  public alertButtons = ['Aceptar', 'Cancelar'];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    //verificar si el usuario no esta logueado
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.getUsers();
  }

  ngOnInit() {}

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
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
          handler: () => {
            console.log('Cancelado');
          },
        },
      ],
    });
    await alert.present();
  }

  getUsers() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/users/list', config)
      .then((result) => {
        if (result.data.success == true) {
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
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete('http://localhost:3000/users/delete/' + id, config)
      .then((result) => {
        if (result.data.success == true) {
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

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? '' : '';
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
