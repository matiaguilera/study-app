import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-topic-list',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            [text]="getBackButtonText()"
            defaultHref="/"
          ></ion-back-button>
        </ion-buttons>
        <ion-title> Topicos - Gabriela Ortega </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="topicos">
      <ion-card>
        <ion-list>
          <!-- NOMBRE Y APELLIDO DEL TOPICO-->
          <ion-item *ngFor="let topico of topicos">
            <ion-label [routerLink]="'/user-edit/' + topico.id"
              >{{ topico.id }} - {{ topico.name }} -
              {{ topico.color }}</ion-label
            >
            <!-- EDITAR TOPICO-->

            <ion-icon
              slot="end"
              name="create"
              [routerLink]="'/topic-edit/' + topico.id"
            ></ion-icon>

            <!-- ELIMINAR TOPICO-->
            <ion-icon
              (click)="confirmDelete(topico.id)"
              slot="end"
              name="trash"
            >
            </ion-icon>
          </ion-item>
        </ion-list>
      </ion-card>

      <!-- AGREGAR TOPICO-->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button [routerLink]="'/topic-edit/0'">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
  styleUrls: ['./topic-list.page.scss'],
})
export class TopicListPage implements OnInit {
  topicos: any = [];
  private platform = inject(Platform);
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
    this.getTopics();
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
            this.deleteTopic(id);
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

  getTopics() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/topics/list', config)
      .then((result) => {
        if (result.data.success == true) {
          this.topicos = result.data.topicos;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteTopic(id: any) {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete('http://localhost:3000/topics/delete/' + id, config)
      .then((result) => {
        if (result.data.success == true) {
          this.presentToast('Topico Eliminado');
          this.getTopics();
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
