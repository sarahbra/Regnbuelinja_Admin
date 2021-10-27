import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ferd } from '../models/ferd';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør ingenting
  templateUrl: './ferder.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class FerderComponent implements OnInit {
  alleFerder: Array<Ferd> = [];
  laster: boolean = false;

  constructor(private _http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.laster = true;
    this.hentAlleFerder();
  }

  hentAlleFerder() {
    this._http
      //Endre til nytt endepunkt som henter alle ferder uten ruteid.
      .get<Ferd[]>('/api/admin/ferder')
      .subscribe(
        (ferder) => {
          this.alleFerder = ferder;
          console.log(this.alleFerder);
          this.laster = false;
        },
        (error) => console.log(error)
      );
  }

  endreFerd(id: number) {}

  slettFerd(id: number) {}

  leggTilFerd() {}
}
