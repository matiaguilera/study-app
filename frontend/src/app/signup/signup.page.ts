import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Regístrate</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-card>
        <ion-item>
          <ion-label class="ion-text-wrap">
            <h2>
              <ion-item>
                <ion-input
                  label="Nombre :"
                  label-placement="stacked"
                  placeholder="Ingrese el nombre"
                  [(ngModel)]="user.name"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Apellido :"
                  labelPlacement="stacked"
                  placeholder="Ingrese el apellido"
                  [(ngModel)]="user.last_name"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Email :"
                  labelPlacement="stacked"
                  placeholder="Ingrese el email"
                  [(ngModel)]="user.email"
                />
              </ion-item>
              <ion-item>
                <ion-input
                  type="password"
                  label="Password :"
                  label-placement="stacked"
                  placeholder="Ingrese el password"
                  [(ngModel)]="user.password"
                />
              </ion-item>
            </h2>
          </ion-label>
        </ion-item>
      </ion-card>
      <div class="button-container">
        <ion-button (click)="saveUser()">Crear cuenta</ion-button>
      </div>
    </ion-content> `,
  styles: [
    `
      .button-container {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    `,
  ],
})
export class SignupPage {
  user: User = { email: '', password: '', name: '', last_name: '' };

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  loginUser(email: string, password: string) {
    axios
      .post('http://localhost:3000/user/login', { email, password })
      .then(async (result) => {
        if (result.data.success) {
          this.presentToast('Bienvenido a StudyApp');
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('email', email);
          this.router.navigate(['/home']);
        } else {
          console.log(result.data.error);
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        console.log(error.message);
        this.presentToast(error.message);
      });
  }

  saveUser() {
    const data = {
      name: this.user.name,
      last_name: this.user.last_name,
      email: this.user.email,
      password: this.user.password,
    };
    axios
      .post('http://localhost:3000/users/update', data)
      .then(async (result) => {
        if (result.data.success) {
          this.presentToast('Usuario Guardado');
          this.loginUser(this.user.email, this.user.password);
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
  }

  ionViewWillEnter(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
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

type User = {
  name?: string;
  last_name?: string;
  email: string;
  password: string;
};
