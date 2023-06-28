import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subject-property-edit',
  template: `
    <div>
      <ion-input
        label="Nombre:"
        label-placement="stacked"
        placeholder="Ingrese el nombre de la propiedad"
        [(ngModel)]="subjectProperty.property_name"
      />
      <ion-input
        label="Valor:"
        label-placement="stacked"
        placeholder="Ingrese el valor de la propiedad"
        [(ngModel)]="subjectProperty.property_value"
      />
    </div>
    <div>
      <ion-button (click)="save.emit(subjectProperty)">Guardar</ion-button>
      <ion-button (click)="cancel.emit()">Cancelar</ion-button>
    </div>
  `,
})
export class SubjectPropertyEditComponent {
  @Input() subjectId = 0;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<any>();

  subjectProperty: any = {
    id: this.getRandomInt(100, 1000),
    property_name: '',
    property_value: '',
  };

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
