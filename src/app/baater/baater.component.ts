import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Baat } from '../models/baat';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';
import { AlertModal } from '../modals/alert.modal';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { BillettModal } from '../modals/billett.modal';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';


@Component({
  templateUrl: './baater.component.html',
})
export class BaaterComponent implements OnInit {
  alleBaater: Array<Baat> = [];
  laster: boolean = false;

  visListe: boolean;
  visSkjemaRegistrere: boolean;
  skjema: FormGroup;

  validering = {
    id: [""],
    navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])] //Regex må fikses!!!
  }

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    public nav: NavbarService
  ) {
    this.skjema = _fb.group(this.validering)
  }

  ngOnInit() {
    this.nav.show()
    this.visListe = true;
    this.laster = true;
    this.hentAlleBaater();
  }

  hentAlleBaater() {
    //Endre til nytt endepunkt som henter alle båter.
    this._http.get<Baat[]>('/api/admin/baater').subscribe(
      (baater) => {
        this.alleBaater = baater;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  vedSubmit() {
    if (this.visSkjemaRegistrere) {
      this.leggTilBaat();
    } else {
      this.endreBaat();
    }
  }

  tilbakeTilListe(){
    this.visListe = true;
    this.nav.show()
  }

  henteEnBaat(id: number){
    this._http.get<Baat>("api/admin/baat/" + id)
    .subscribe(
      baat=>{
        this.skjema.patchValue({id: baat.id})
        this.skjema.patchValue({navn: baat.navn})
      },
      error=> console.log(error)
    );
    this.visSkjemaRegistrere = false;
    this.visListe = false;
    this.nav.hide()
  }


  endreBaat() {
    const endretBaat = new Baat();
    endretBaat.id = this.skjema.value.id;
    endretBaat.navn = this.skjema.value.navn;

    this._http.put("api/admin/baat/" + endretBaat.id, endretBaat)  //Droppe id i backend? Får http parsing errror selv om endring er vellykket...
      .subscribe(
        baat => {
          this.hentAlleBaater();
          this.visListe = true;
        },
        error => console.log(error)
      );
  }



  slettBaat(id: number) { }

  leggTilBaat() { }






  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette båt ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/baat/' + id).subscribe(
          () => {
            this.hentAlleBaater();
          },
          (res) => {
            const modalRef = this.modalService.open(AlertModal, {
              backdrop: 'static',
              keyboard: false,
            });
            let textBody: string = res.error;
            modalRef.componentInstance.updateBody(textBody);
            //Modal for å vise billetter knyttet til båt hvis bruker klikker "Vis billetter"
            modalRef.result.then((retur) => {
              console.log('Lukket med:' + retur);
              if (retur == 'Vis') {
                const modalRef = this.modalService.open(BillettModal, {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'lg',
                });
                let textBody: string =
                  'Billetter tilknyttet båt med id ' +
                  id +
                  '\nmå slettes før båten kan slettes';
                modalRef.componentInstance.updateBody(textBody);
                (<BillettModal>modalRef.componentInstance).idAsInput = id;
                (<BillettModal>modalRef.componentInstance).endepunktAsInput =
                  'baat';
              }
            });
          }
        );
      }
      this._router.navigate(['/baater']);
    });
  }

 

}
