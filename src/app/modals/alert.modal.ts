import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'alert.modal.html',
})
export class AlertModal {
  body: string;
  updateBody(input: string) {
    this.body = input;
  }

  constructor(public modal: NgbActiveModal) {}
}
