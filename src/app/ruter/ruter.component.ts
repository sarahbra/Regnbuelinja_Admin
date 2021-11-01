import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rute } from '../models/rute';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';
import { AlertModal } from '../modals/alert.modal';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { BillettModal } from '../modals/billett.modal';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LeggTilModal } from '../modals/legg_til.modal';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør
  templateUrl: './ruter.component.html',
  //styleUrls: ['./ruter.css'],
})
export class RuterComponent implements OnInit {
  alleRuter: Array<Rute> = [];
  laster: boolean = false;

  //Id fra rute, ferd, båt eller bestilling
  dataPassToChild: number = 0;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService
  ) {}

  ngOnInit() {
    this.nav.show();
    this.laster = true;
    this.hentAlleRuter();
  }

  hentAlleRuter() {
    this._http.get<Rute[]>('/api/admin/ruter').subscribe(
      (rutene) => {
        this.alleRuter = rutene;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreRute(id: number) {}

  leggTilRute() {
    const modalRef = this.modalService.open(LeggTilModal, {
      backdrop: 'static', keyboard: false
    });
/*
    const forms: FormGroup = new FormGroup({
      startpunktForm: new FormControl('', Validators.pattern('[a-zA-ZøæåØÆÅ\\-. ]{2,30}')),
      endepunktForm: new FormControl('', Validators.pattern('[a-zA-ZøæåØÆÅ\\-. ]{2,30}')),
      prisForm: new FormControl('', Validators.pattern('/^-?\d+\.?\d*$/'))
    });
*/    
/*
    const allForms = {
      startpunktForm: [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZøæåØÆÅ\\-. ]{2,30}')])],
      endepunktForm: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-ZæøåÆØÅ])([a-zA-ZæøåÆØÅ0-9]+){6,}$')])],
      prisForm: [null, Validators.compose([Validators.required, Validators.pattern('/^-?\d+\.?\d*$/')])]
    };
*/
    const fb = new FormBuilder();
    
    const allForms: Array<FormControl> = []
    allForms.push(new FormControl('', Validators.pattern('[a-zA-ZøæåØÆÅ\\-. ]{2,30}')));
    allForms.push(new FormControl('', Validators.pattern('[a-zA-ZøæåØÆÅ\\-. ]{2,30}')));
    allForms.push(new FormControl('', Validators.pattern('/^-?\d+\.?\d*$/')));

    modalRef.componentInstance.setForms(allForms);
    //modalRef.componentInstance.setForms(fb.group(allForms));

    const rute: Rute = {
      id: -1,
      startpunkt: "",
      endepunkt: "",
      pris: -1
    };
    

    const startpunktHTML = "<div class='form-group row'>"
        + "<div class='col-sm-4'>"
        + "<input type='text' formControlName='startpunktForm' class='form-control' placeholder='Startpunkt' autofocus />"
        + "</div>"
        + "<div>"
        + "<small class='alert alert-warning' [hidden]='allForms[0].valid || allForms[0].pristine'>"
        + "Brukernavnet må bestå av 2 til 20 bokstaver"
        + "</small>"
        + "</div>"
        + "</div>";

/*
    const startpunktHTML = "<div class='md-form mb-5'>"
        + "<label for='startpunkt'>Startpunkt</label>"
        + "<input type='text' id='startpunkt' [formControl]='startpunktForm' class='form-control mdbInput mdbValidate'>"

        + "<mdb-error *ngIf='startpunktForm.invalid && (startpunktForm.dirty || startpunktForm.touched)'>"
        + "Input invalid</mdb-error>"
        + "<mdb-success *ngIf='startpunktForm.valid && (startpunktForm.dirty || startpunktForm.touched)'>"
        + "Input valid</mdb-success>"

        + "</div>";
*/
    const endepunktHTML = "<div class='md-form mb-5'>"
        + "<label for='endepunkt'>Endepunkt</label>"
        + "<input type='text' id='endetpunkt' [formControl]='endepunktForm' class='form-control mdbInput mdbValidate'>"
/*
        + "<mdb-error *ngIf='startpunktForm.invalid && (startpunktForm.dirty || startpunktForm.touched)'>"
        + "Input invalid</mdb-error>"
        + "<mdb-success *ngIf='startpunktForm.valid && (startpunktForm.dirty || startpunktForm.touched)'>"
        + "Input valid</mdb-success>"
*/
        + "</div>";    

    const prisHTML = "<div class='md-form mb-5'>"
        + "<label for='pris'>Startpunkt</label>"
        + "<input type='text' id='pris' [formControl]='prisForm' class='form-control mdbInput mdbValidate'>"
      /*
        + "<mdb-error *ngIf='startpunktForm.invalid && (startpunktForm.dirty || startpunktForm.touched)'>"
        + "Input invalid</mdb-error>"
        + "<mdb-success *ngIf='startpunktForm.valid && (startpunktForm.dirty || startpunktForm.touched)'>"
        + "Input valid</mdb-success>"
      */
        + "</div>";

    const body = startpunktHTML; // + endepunktHTML + prisHTML;
    modalRef.componentInstance.setBody(body);
  }

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette Rute ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/rute/' + id).subscribe(
          () => {
            this.hentAlleRuter();
          },
          //Lage en kulere alert dialog?
          (res) => {
            const modalRef = this.modalService.open(AlertModal, {
              backdrop: 'static',
              keyboard: false,
            });
            let textBody: string = res.error;
            modalRef.componentInstance.updateBody(textBody);
            //Modal for å vise billetter knyttet til rute hvis bruker klikker "Vis billetter"
            modalRef.result.then((retur) => {
              console.log('Lukket med:' + retur);
              if (retur == 'Vis') {
                const modalRef = this.modalService.open(BillettModal, {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'lg',
                });
                let textBody: string =
                  'Billetter tilknyttet rute med id ' +
                  id +
                  '\nmå slettes før ruten kan slettes';
                modalRef.componentInstance.updateBody(textBody);
                (<BillettModal>modalRef.componentInstance).dataToTakeAsInput =
                  id;
              }
            });
          }
        );
      }
      this._router.navigate(['/ruter']);
    });
  }
}
