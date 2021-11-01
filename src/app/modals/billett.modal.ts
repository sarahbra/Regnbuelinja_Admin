import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Billett } from '../models/billett';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlettErrorModal } from './slett-error.modal';

//Dette er en modal som lister de billettene som er knyttet til en rute, ferd, båt eller bestilling
//billettene som er linket må slettes FØR man kan slette de nevnte entitetene.
//Dette for å sikre at en kunde som har betalt for en reise ikke ender opp med en tom ferd, rute, uten bår etc..

@Component({
  templateUrl: 'billett.modal.html',
})
export class BillettModal implements OnInit {
  //Body må fylles med rute-id
  body: string;
  updateBody(input: string) {
    this.body = input;
  }
  alleBilletter: Array<Billett> = [];
  laster: boolean;
  @Input() idAsInput: number;
  @Input() endepunktAsInput: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    public modal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.laster = true;
    this.hentAlle();
  }

  hentAlle() {
    //Id må være ruteid eller ferdid etc. Endepunktet må endres ut fra hva som sendes inn (ferd, rute, båt)
    this._http
      .get<Billett[]>(
        '/api/admin/' +
          this.endepunktAsInput +
          '/' +
          this.idAsInput +
          '/billetter'
      )
      .subscribe(
        (billetter) => {
          this.alleBilletter = billetter;
          this.laster = false;
        },
        (res) => console.log(res.e)
      );
  }

  slettBillett(id: number) {
    this._http.delete('/api/admin/billett/' + id).subscribe(
      (ok) => {
        this.hentAlle();
      },
      //Dersom billetten ikke kan slettes er det fordi ankomsttid ikke har vært samtidig som at billetten er betalt->
      //modal vises med info om at billett ikke kan slettes og lukk en knapp. Dersom billett skal slettes må dette løses med kunde kun dersom den er betalt.
      //Vi har valgt å ha denne sperren fordi det virker litt rart å kunne slette billetter som kunder har betalt for uten en slags sperre
      (res) => {
        const modalRef = this.modalService.open(SlettErrorModal, {
          backdrop: 'static',
          keyboard: false,
        });
        let textBody: string =
          'Billetten kan ikke ikke slettes fordi den er betalt og reisen er frem i tid';
        modalRef.componentInstance.updateBody(textBody);
      }
    );
  }
}
