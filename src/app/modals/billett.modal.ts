import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Billett } from '../models/billett';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BestillingUbetaltModal } from './bestillingUbetalt.modal';

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
  @Input() dataToTakeAsInput: number;

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
        '/api/admin/rute/' + this.dataToTakeAsInput + '/billetter'
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
    this._http.delete('/api/admin/billett/' + id).subscribe((ok) => {
      this.hentAlle();
    }),
      //Dersom billetten ikke kan slettes er det fordi den er ubetalt -> modal vises med info og lukk knapp. Admin må håndtere betaling først som ikke er den del av vår løsning
      (err: string) => {
        const modalRef = this.modalService.open(BestillingUbetaltModal, {
          backdrop: 'static',
          keyboard: false,
        });
        let textBody: string = err;
        modalRef.componentInstance.updateBody(textBody);
      };
    this._router.navigate(['/ruter']);
  }
}
