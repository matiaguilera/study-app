import { formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-topic-edit',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button [text]="getBackButtonText()" defaultHref="/" />
        </ion-buttons>
        <ion-title>{{ accion }} tópico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="topic">
      <ion-card>
        <ion-item>
          <ion-label class="ion-text-wrap">
            <h2>
              <ion-list>
                <ion-item>
                  <ion-input
                    label="Nombre :"
                    label-placement="stacked"
                    placeholder="Ingrese el nombre"
                    [(ngModel)]="topic.name"
                  />
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Descripción :"
                    label-placement="stacked"
                    placeholder="Ingrese una descripción"
                    [(ngModel)]="topic.description"
                  />
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Orden :"
                    labelPlacement="stacked"
                    placeholder="Ingrese el orden"
                    [(ngModel)]="topic.order"
                  />
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Prioridad :"
                    labelPlacement="stacked"
                    placeholder="Ingrese prioridad en numeros"
                    [(ngModel)]="topic.priority"
                  />
                </ion-item>
              </ion-list>
            </h2>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="saveTopic()">
          <ion-icon name="save" />
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
})
export class TopicEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topic: any = '';
  accion = 'Agregar';
  email: string | null = '';
  userId = '';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    this.getUserId();
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    axios
      .get('http://localhost:3000/topics/buscarPorCodigo/' + id, config)
      .then((result) => {
        if (result.data.success) {
          if (id !== '0') {
            this.accion = 'Editar';
          }
          if (result.data.topic) {
            const { id, name, description, priority, order } =
              result.data.topic;
            this.topic = { id, name, description, priority, order };
          } else {
            this.topic = {};
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

  saveTopic() {
    this.email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    let data = {
      id: this.topic.id,
      create_date: fecha,
      name: this.topic.name,
      description: this.topic.description,
      order: this.topic.order,
      priority: this.topic.priority,
      owner_user_id: this.userId,
    };
    axios
      .post('http://localhost:3000/topics/update', data, config)
      .then(async (result) => {
        if (result.data.success) {
          this.presentToast('Topico Guardado');
          this.router.navigate(['/']);
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
  }

  getUserId() {
    let token = localStorage.getItem('token');
    this.email = localStorage.getItem('email');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/users/buscarPorEmail/' + this.email, config)
      .then((result) => {
        if (result.data.success) {
          this.userId = result.data.usuario.id;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
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
