import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Study App</ion-title>
        <ion-buttons slot="end">
          <ion-button [routerLink]="'/user-edit/' + userId">
            <ion-icon name="settings-outline" />
          </ion-button>
          <ion-button (click)="logout()">
            <ion-icon name="log-out-outline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="topics">
      <ion-select
        (ionChange)="onSelectChange($event)"
        [disabled]="!topics"
        label="Ordenar por:"
        placeholder="defecto"
      >
        <ion-select-option value="defecto">defecto</ion-select-option>
        <ion-select-option value="fecha">fecha</ion-select-option>
        <ion-select-option value="prioridad">prioridad</ion-select-option>
        <ion-select-option value="rango">rango</ion-select-option>
      </ion-select>

      <ion-list>
        <ion-item *ngFor="let topic of topics">
          <div class="container">
            <ion-card [routerLink]="'/topic/' + topic.id">
              <ion-card-header>
                <ion-card-title
                  >{{ topic.id }}) {{ topic.name }}</ion-card-title
                >
                <ion-card-subtitle
                  >Creado por {{ topic.user_name + ' ' + topic.last_name }} el
                  {{ topic.create_date | date : 'dd/MM/YY' }}</ion-card-subtitle
                >
              </ion-card-header>
              <ion-card-content>
                {{ topic.description }}
              </ion-card-content>
              <div style="padding-left: 20px; padding-bottom: 20px;">
                <p>
                  Orden: {{ topic.order }} - Prioridad: {{ topic.priority }}
                </p>
              </div>
            </ion-card>
            <ion-buttons *ngIf="topic.email === email">
              <ion-button [routerLink]="'/topic-edit/' + topic.id" fill="clear"
                >Editar</ion-button
              >
              <ion-button
                (click)="confirmDelete(topic.id)"
                fill="clear"
                color="danger"
                >Eliminar</ion-button
              >
            </ion-buttons>
          </div>
        </ion-item>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button routerLink="/topic-edit/0">
          <ion-icon name="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      ion-card {
        width: 100%;
        cursor: pointer;
      }
      ion-card:hover {
        background-color: #151515;
      }
      ion-select {
        width: fit-content;
        margin-left: 2rem;
      }
      ion-fab {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
      .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})
export class HomePage {
  topics: any = [];

  email: string | null = '';
  userId: string | null = '';

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
    this.email = localStorage.getItem('email');
    this.config = {
      headers: {
        authorization: this.token,
      },
    };
    this.getTopics();
    this.getUserId();
  }

  getUserId() {
    let token = localStorage.getItem('token');
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

  deleteTopic(id: string) {
    axios
      .delete('http://localhost:3000/topics/delete/' + id, this.config)
      .then((result) => {
        if (result.data.success) {
          this.getTopics();
          this.presentToast('Tópico eliminado.');
        } else {
          this.presentToast(result.data.error);
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        this.presentToast(error.message);
        console.log(error.data.message);
      });
  }

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea eliminar este tópico?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteTopic(id);
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

  logout() {
    axios
      .post('http://localhost:3000/user/logout', '', this.config)
      .then(async (result) => {
        if (result.data.success) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
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

  getTopics() {
    axios
      .get('http://localhost:3000/topics/list', this.config)
      .then((result) => {
        if (result.data.success) {
          this.topics = result.data.topicos;
        } else {
          this.presentToast(result.data.error);
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        this.presentToast(error.message);
        console.log(error.data.message);
      });
  }

  onSelectChange(event: any) {
    const tipo = event.target.value;
    switch (tipo) {
      case 'fecha':
        this.orderByDate();
        break;
      case 'rango':
        this.orderByRank();
        break;
      case 'prioridad':
        this.orderByPriority();
        break;
      case 'defecto':
        this.orderByDefault();
    }
  }

  orderByDate() {
    this.topics.sort(
      (a: any, b: any) =>
        (new Date(a.create_date) as any) - (new Date(b.create_date) as any)
    );
  }

  orderByRank() {
    this.topics.sort((a: any, b: any) => a.order - b.order);
  }

  orderByPriority() {
    this.topics.sort((a: any, b: any) => a.priority - b.priority);
  }

  orderByDefault() {
    this.topics.sort((a: any, b: any) => a.id - b.id);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
