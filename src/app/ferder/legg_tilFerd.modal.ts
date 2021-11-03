import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ferd } from '../models/ferd';

@Component({
    templateUrl: './legg_tilFerd.modal.html'
})
export class LeggTilFerdModal {
    forms: FormGroup;
    fb: FormBuilder = new FormBuilder();

    allForms = {
        bIdForm: [null],
        rIdForm: [null],
        avreiseTidForm: [null],
        ankomstTidForm: [null]
    }

    constructor(public modal: NgbActiveModal, private http: HttpClient){ }

    ngOnInit() {
        this.forms = this.fb.group(this.allForms);
    }
  
    vedSubmit() {
      const bId = this.forms.value.bIdForm;
      const rId = this.forms.value.rIdForm;
      const avreiseTid = this.forms.value.avreiseTidForm;
      const ankomstTid = this.forms.value.ankomstTidForm;
      
      const ferd = new Ferd(bId, rId, avreiseTid, ankomstTid);
      //const rute = null;

      this.http.post('/api/admin/ferder', ferd).subscribe(
        (ok) => {
          if (!ok){
            this.modal.close("Mislykket");
          }
        },
        (error) => {
          this.modal.close("Mislykket");
          console.log(error)
        }
      );

      this.modal.close("Vellykket");
    }
}