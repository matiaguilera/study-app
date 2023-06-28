import { formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-subject-edit',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
        <ion-title> {{ accion }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="subject">
      <ion-card>
        <ion-item>
          <ion-label class="ion-text-wrap">
            <ion-list>
              <ion-item>
                <ion-input
                  label="Nombre:"
                  label-placement="stacked"
                  placeholder="Ingrese el nombre"
                  [(ngModel)]="subject.name"
                />
              </ion-item>
              <ion-item>
                <ion-input
                  label="Descripcion:"
                  labelPlacement="stacked"
                  placeholder="Ingrese la descripcion"
                  [(ngModel)]="subject.description"
                />
              </ion-item>
              <ion-item>
                <ion-input
                  label="Palabras Clave:"
                  labelPlacement="stacked"
                  placeholder="Ingrese palabras clave"
                  [(ngModel)]="subject.keywords"
                />
              </ion-item>
            </ion-list>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="saveUser()">
          <ion-icon name="save" />
        </ion-fab-button>
      </ion-fab>
    </ion-content> `,
})
export class SubjectEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  subject: any = '';
  accion = 'Agregar asignatura';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    axios
      .get('http://localhost:3000/subjects/buscarPorCodigo/' + id, config)
      .then((result) => {
        if (result.data.success) {
          if (id !== '0') {
            this.accion = 'Editar Tema';
          }
          if (result.data.subject) {
            this.subject = result.data.subject;
          } else {
            this.subject = {};
          }
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  saveUser() {
    const token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const create_date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const data = {
      id: this.subject.id,
      create_date,
      name: this.subject.name,
      description: this.subject.description,
      keywords: this.subject.keywords,
      owner_user_id: 1,
    };
    axios
      .post('http://localhost:3000/subjects/update', data, config)
      .then(async (result) => {
        if (result.data.success) {
          this.presentToast('Asignatura guardada');
          this.router.navigate(['/subject-list']);
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
