import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  Form,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Billett } from '../models/billett';

@Component({
  templateUrl: './legg_tilBillett.modal.html',
})
export class LeggTilBillettModal {
  forms: FormGroup;
  fb: FormBuilder = new FormBuilder();
  voksen: any;

    allForms = {
      fIdForm: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      bIdForm: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])]
    }

  constructor(public modal: NgbActiveModal, private http: HttpClient) {}

  ngOnInit() {
    this.forms = this.fb.group(this.allForms);
    this.voksen = document.getElementById('voksen');
    this.voksen.checked = true;
  }

  vedSubmit() {
    const fId = this.forms.value.fIdForm;
    const bId = this.forms.value.bIdForm;
    const billett = new Billett(fId, bId, this.voksen.checked);

    this.http.post('/api/admin/billetter', billett).subscribe(
      (ok) => {
        if (ok) {
          this.modal.close('Vellykket');
        } else {
          this.modal.close('Mislykket');
        }
      },
      (error) => {
        this.modal.close('Mislykket');
        console.log(error);
      }
    );
  }
}
