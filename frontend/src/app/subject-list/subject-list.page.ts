import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-theme-list',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
        <ion-title>Asignaturas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="subjects">
      <ion-card>
        <ion-list>
          <ion-item *ngFor="let subject of subjects">
            <ion-label [routerLink]="'/subject-edit/' + subject.id"
              >{{ subject.id }} - {{ subject.name }} -
              {{ subject.description }}</ion-label
            >
            <ion-icon
              slot="end"
              name="create"
              [routerLink]="'/subject-edit/' + subject.id"
            />
            <ion-icon
              (click)="confirmDelete(subject.id)"
              slot="end"
              name="trash"
            />
          </ion-item>
        </ion-list>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button routerLink="/subject-edit/0">
          <ion-icon name="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
})
export class SubjectListPage implements OnInit {
  subjects: any = [];

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
    this.getSubjects();
  }

  ngOnInit() {}

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'Desea eliminar el registro?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteSubject(id);
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

  getSubjects() {
    axios
      .get('http://localhost:3000/subjects/list', this.config)
      .then((result) => {
        if (result.data.success) {
          this.subjects = result.data.subjects;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteSubject(id: any) {
    axios
      .delete('http://localhost:3000/subjects/delete/' + id, this.config)
      .then((result) => {
        if (result.data.success) {
          this.presentToast('Asignatura eliminada');
          this.subjects = this.subjects.filter(
            (subject: any) => subject.id !== id
          );
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
