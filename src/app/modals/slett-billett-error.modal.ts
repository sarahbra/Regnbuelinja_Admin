import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'slett-billett-error.modal.html',
})
export class SlettBillettErrorModal {
  body: string;
  updateBody(input: string) {
    this.body = input;
  }

  constructor(public modal: NgbActiveModal) {}
}
