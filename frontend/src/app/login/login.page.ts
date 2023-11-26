import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-login',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Iniciar sesión</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-card>
        <ion-item>
          <ion-label class="ion-text-wrap">
            <h2>
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
      <div class="buttons-container">
        <ion-button (click)="loginUser(user.email, user.password)"
          >Acceder</ion-button
        >
        <p>
          ¿No tienes cuenta?
          <a routerLink="/signup">Regístrate</a>
        </p>
      </div>
    </ion-content> `,
  styles: [
    `
      .buttons-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      ion-button {
        width: fit-content;
      }
      p {
        color: white;
      }
    `,
  ],
})
export class LoginPage {
  user = { email: '', password: '' };

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    axios
      .get('http://localhost:3000/users/buscarPorCodigo/0')
      .then((result) => {
        if (result.data.success) {
          if (result.data.usuario) {
            this.user = result.data.usuario;
          } else {
            this.user = { email: '', password: '' };
          }
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

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
