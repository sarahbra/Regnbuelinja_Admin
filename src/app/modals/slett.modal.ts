import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'slett.modal.html'
})
export class SlettModal {
    body: string;
    updateBody(input: string){
        this.body = input;
    } 

    constructor(public modal: NgbActiveModal){ }


}