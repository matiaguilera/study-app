import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Study App</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
            <ion-icon name="log-out-outline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="subjects">
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button routerLink="/topic-list">
            <ion-icon name="document-text-outline" />
            Tópicos
          </ion-tab-button>
          <ion-tab-button routerLink="/subject-list">
            <ion-icon name="document-text-outline" />
            Asignaturas
          </ion-tab-button>
          <ion-tab-button routerLink="/user-list">
            <ion-icon name="person-circle-outline" />
            Usuarios
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>

      <ion-card>
        <ion-accordion-group>
          <ion-accordion *ngFor="let subject of subjects">
            <ion-item slot="header" color="light">
              <ion-label
                >{{ subject.id }} - {{ subject.name }} -
                {{ subject.description }}</ion-label
              >
            </ion-item>
            <div
              *ngFor="let subjectProperty of subjectProperties"
              slot="content"
            >
              <label
                *ngIf="subjectProperty.theme_id === subject.id"
                class="ion-padding"
              >
                {{ subjectProperty.theme_id }} -
                {{ subjectProperty.property_name }}
              </label>
            </div>
            <div class="ion-padding" slot="content">
              <ion-icon
                *ngIf="!subject.showPropertyForm"
                (click)="subject.showPropertyForm = true"
                slot="end"
                size="large"
                name="add-circle"
              />
              <app-subject-property-edit
                (save)="
                  saveProperty($event, subject.id);
                  subject.showPropertyForm = false
                "
                (cancel)="subject.showPropertyForm = false"
                *ngIf="subject.showPropertyForm"
              />
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-card>
    </ion-content>
  `,
})
export class HomePage {
  subjects: any = [];
  subjectProperties: any = [];

  token: string | null = '';
  config: any;

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
    this.token = localStorage.getItem('token');
    this.config = {
      headers: {
        authorization: token,
      },
    };
    this.getSubjects();
    this.getSubjectProperties();
  }

  logout() {
    axios
      .post('http://localhost:3000/user/logout', '', this.config)
      .then(async (result) => {
        if (result.data.success) {
          localStorage.removeItem('token');
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

  getSubjects() {
    axios
      .get('http://localhost:3000/subjects/list', this.config)
      .then((result) => {
        if (result.data.success) {
          result.data.subjects.map((subject: any) => {
            subject.showPropertyForm = false;
          });
          this.subjects = result.data.subjects;
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

  getSubjectProperties() {
    axios
      .get('http://localhost:3000/subject_properties/list', this.config)
      .then((result) => {
        if (result.data.success) {
          this.subjectProperties = result.data.subject_properties;
        } else {
          console.log(result.data.error);
          this.presentToast(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.presentToast(error.message);
      });
  }

  saveProperty(newProperty: any, id: number) {
    const token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    newProperty.theme_id = id;
    console.log(newProperty);
    axios
      .post(
        'http://localhost:3000/subject_properties/update',
        newProperty,
        config
      )
      .then(async (result) => {
        if (result.data.success) {
          this.subjectProperties.push(newProperty);
          this.presentToast('Nueva propiedad guardada');
          this.router.navigate(['/home']);
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
      message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
