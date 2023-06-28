import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-user-edit',
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

    <ion-content [fullscreen]="true" *ngIf="usuario">
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
                    [(ngModel)]="usuario.name"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Apellido :"
                    labelPlacement="stacked"
                    placeholder="Ingrese el apellido"
                    [(ngModel)]="usuario.last_name"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Email :"
                    labelPlacement="stacked"
                    placeholder="Ingrese el email"
                    [(ngModel)]="usuario.email"
                  ></ion-input>
                </ion-item>
              </ion-list>
            </h2>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="saveUser()">
          <ion-icon name="save"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
})
export class UserEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario: any = '';
  accion = 'Agregar Usuario';

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
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    axios
      .get('http://localhost:3000/users/buscarPorCodigo/' + id, config)
      .then((result) => {
        if (result.data.success == true) {
          if (id !== '0') {
            this.accion = 'Editar Usuario';
          }
          if (result.data.usuario != null) {
            this.usuario = result.data.usuario;
          } else {
            this.usuario = {};
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
    var data = {
      id: this.usuario.id,
      name: this.usuario.name,
      last_name: this.usuario.last_name,
      email: this.usuario.email,
    };
    axios
      .post('http://localhost:3000/users/update', data, config)
      .then(async (result) => {
        if (result.data.success) {
          this.presentToast('Usuario Guardado');
          this.router.navigate(['/user-list']);
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
