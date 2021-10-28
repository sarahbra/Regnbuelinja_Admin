import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Billett } from '../models/billett';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Dette er en modal som lister de billettene som er knyttet til en rute, ferd, båt eller bestilling
//som må slettes FØR man kan slette de nevnte entitetene

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
  voksen: boolean;
  @Input() dataToTakeAsInput: number;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    public modal: NgbActiveModal
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
    //HVIS bestilling er ubetalt så vis feilmelding om at Bestilling er ubetalt og kan ikke slettes
  }
}
