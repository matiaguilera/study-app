import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Message } from '../services/data.service';

@Component({
  selector: 'app-message',
  template: `<ion-item
    *ngIf="message"
    [routerLink]="'/message/' + message.id"
    [detail]="false"
  >
    <div slot="start" [class]="!message.read ? 'dot dot-unread' : 'dot'"></div>
    <ion-label class="ion-text-wrap">
      <h2>
        {{ message.fromName }}
        <span class="date">
          <ion-note>{{ message.date }}</ion-note>
          <ion-icon
            aria-hidden="true"
            name="chevron-forward"
            size="small"
            *ngIf="isIos()"
          ></ion-icon>
        </span>
      </h2>
      <h3>{{ message.subject }}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </ion-label>
  </ion-item>`,
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  private platform = inject(Platform);
  @Input() message?: Message;
  isIos() {
    return this.platform.is('ios');
  }
}
