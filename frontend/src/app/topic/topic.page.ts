import { Component, inject } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-topic',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button [text]="getBackButtonText()" defaultHref="/" />
        </ion-buttons>
        <ion-title>Study App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="topic">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ topic.id }}) {{ topic.name }}</ion-card-title>
          <ion-card-subtitle
            >Creado por {{ topic.user_name + ' ' + topic.last_name }} el
            {{ topic.create_date | date : 'dd/MM/YY' }}</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          {{ topic.description }}
        </ion-card-content>
      </ion-card>
      <h3>Propiedades</h3>
      <ion-list *ngIf="topicProperties">
        <ion-item *ngFor="let topicProperty of topicProperties">
          <span style="text-decoration:underline;">{{
            topicProperty.property_name
          }}</span
          >: {{ topicProperty.property_value }}
          <ion-icon
            (click)="deleteTopicProperty(topicProperty.id)"
            style="margin-left: 20px; cursor: pointer;"
            name="trash"
          />
        </ion-item>
      </ion-list>
      <ion-button
        *ngIf="topic.email === email"
        (click)="showPropertyForm = !showPropertyForm"
        >Agregar propiedad</ion-button
      >
      <ng-container *ngIf="showPropertyForm">
        <ion-input [(ngModel)]="property.property_name" placeholder="Nombre" />
        <ion-input [(ngModel)]="property.property_value" placeholder="Valor" />
        <ion-button (click)="addTopicProperty()" fill="clear"
          >Enviar</ion-button
        >
        <ion-button (click)="showPropertyForm = false" fill="clear"
          >Cancelar</ion-button
        >
      </ng-container>
      <h3>Subtemas</h3>
      <ion-list *ngIf="topicItems">
        <ion-item *ngFor="let item of topicItems">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ item.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              {{ item.description }}
            </ion-card-content>
            <ng-container *ngIf="topic.email === email">
              <ion-button
                (click)="deleteTopicItem(item.id)"
                fill="clear"
                color="danger"
                >Eliminar</ion-button
              >
            </ng-container>
          </ion-card>
        </ion-item>
      </ion-list>
      <ion-button
        *ngIf="topic.email === email"
        (click)="showTopicItemForm = !showTopicItemForm"
        >Agregar subtema</ion-button
      >
      <ng-container *ngIf="showTopicItemForm">
        <ion-input [(ngModel)]="topicItem.name" placeholder="Título" />
        <ion-input
          [(ngModel)]="topicItem.description"
          placeholder="Descripcion"
        />
        <ion-button (click)="addTopicItem()" fill="clear">Enviar</ion-button>
        <ion-button (click)="showTopicItemForm = false" fill="clear"
          >Cancelar</ion-button
        >
      </ng-container>
      <ion-textarea
        [(ngModel)]="newComment"
        placeholder="Escribe un comentario"
      />
      <ion-button (click)="addComment()">Comentar</ion-button>
      <ion-list>
        <ion-item *ngFor="let comment of comments">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle
                >{{ comment.name + ' ' + comment.last_name }} el
                {{ comment.create_date | date : 'dd/MM/YY' }}</ion-card-subtitle
              >
            </ion-card-header>
            <ion-card-content>
              {{ comment.content }}
            </ion-card-content>

            <ion-button
              *ngIf="comment.owner_user_id === userId"
              fill="clear"
              color="danger"
              (click)="deleteComment(comment.id)"
              >Eliminar</ion-button
            >
          </ion-card>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class TopicPage {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  topic: any = null;
  topicItems: any = null;
  topicProperties: any = null;
  email: string | null = '';
  showPropertyForm = false;
  showTopicItemForm = false;

  topicItem = { name: '', description: '' };
  property = { property_name: '', property_value: '' };

  token: string | null = '';
  config: any;

  comments: any[] = [];

  newComment = '';
  userId = '';
  topicId = '';

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    this.email = localStorage.getItem('email');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    this.topicId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    axios
      .get(
        'http://localhost:3000/topics/buscarPorCodigo/' + this.topicId,
        config
      )
      .then((result) => {
        if (result.data.success) {
          this.topic = result.data.topic;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    this.getUserId();
    this.getComments();
    this.getTopicProperties();
    this.getTopicItems();
  }

  getTopicItems() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/topic_items/list/' + this.topicId, config)
      .then((result) => {
        if (result.data.success) {
          this.topicItems = result.data.topicItems;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  getTopicProperties() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        'http://localhost:3000/topic_properties/list/' + this.topicId,
        config
      )
      .then((result) => {
        if (result.data.success) {
          this.topicProperties = result.data.topicProperties;
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

  getComments() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/comments/list/' + this.topicId, config)
      .then((result) => {
        if (result.data.success) {
          this.comments = result.data.comentarios;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteComment(id: string) {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete('http://localhost:3000/comments/delete/' + id, config)
      .then((result) => {
        if (result.data.success) {
          this.presentToast('Comentario eliminado.');
          this.getComments();
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  addComment() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let data = {
      create_date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      content: this.newComment,
      owner_user_id: this.userId,
      theme_id: this.topicId,
    };
    axios
      .post('http://localhost:3000/comments/update', data, config)
      .then((result) => {
        if (result.data.success) {
          this.newComment = '';
          this.getComments();
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  addTopicItem() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    let data = {
      create_date: fecha,
      name: this.topicItem.name,
      description: this.topicItem.description,
      topic_id: this.topicId,
    };
    axios
      .post('http://localhost:3000/topic_items/update', data, config)
      .then((result) => {
        if (result.data.success) {
          this.topicItem = { name: '', description: '' };
          this.showTopicItemForm = false;
          this.presentToast('Subtema guardado');
          this.getTopicItems();
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  addTopicProperty() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let data = {
      property_name: this.property.property_name,
      property_value: this.property.property_value,
      topic_id: this.topicId,
    };
    console.log(data);
    axios
      .post('http://localhost:3000/topic_properties/update', data, config)
      .then((result) => {
        if (result.data.success) {
          this.property = { property_name: '', property_value: '' };
          this.showPropertyForm = false;
          this.presentToast('Propiedad guardada');
          this.getTopicProperties();
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteTopicItem(id: string) {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete('http://localhost:3000/topic_items/delete/' + id, config)
      .then((result) => {
        if (result.data.success) {
          this.presentToast('Subtema eliminado.');
          this.getTopicItems();
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteTopicProperty(id: string) {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete('http://localhost:3000/topic_properties/delete/' + id, config)
      .then((result) => {
        if (result.data.success) {
          this.presentToast('Propiedad eliminada.');
          this.getTopicProperties();
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
      message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
