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
        bIdForm: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
        rIdForm: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
        avreiseDatoForm: [null, Validators.compose([Validators.required, Validators.pattern(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/)])],
        avreiseKlokkeslettForm: [null, Validators.compose([Validators.required, Validators.pattern(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/)])],
        ankomstDatoForm: [null, Validators.compose([Validators.required, Validators.pattern(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/)])],
        ankomstKlokkeslettForm: [null, Validators.compose([Validators.required, Validators.pattern(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/)])]
    }

    constructor(public modal: NgbActiveModal, private http: HttpClient){ }

    ngOnInit() {
        this.forms = this.fb.group(this.allForms);
    }
  
    vedSubmit() {
      const bId = this.forms.value.bIdForm;
      const rId = this.forms.value.rIdForm;
      const avreiseDato = this.forms.value.avreiseDatoForm;
      const ankomstDato = this.forms.value.ankomstDatoForm;
      const avreiseKlokkeslett = this.forms.value.avreiseKlokkeslettForm;
      const ankomstKlokkeslett = this.forms.value.ankomstKlokkeslettForm;
      
      const avreiseTid = avreiseDato + " " + avreiseKlokkeslett;
      const ankomstTid = ankomstDato + " " +ankomstKlokkeslett;

      const ferd = new Ferd(bId, rId, avreiseTid, ankomstTid);
      //const rute = null;

      this.http.post('/api/admin/ferder', ferd).subscribe(
        (ok) => {
          if (ok)
            this.modal.close("Vellykket");
          else {
            this.modal.close("Mislykket");
          }
        },
        (error) => {
          this.modal.close("Mislykket");
          console.log(error)
        }
      );

    }
}