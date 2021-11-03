import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Kunde } from '../models/kunde';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { SlettModal } from '../modals/slett.modal';
import { AlertModal } from '../modals/alert.modal';
import { LeggTilKundeModal } from './legg_tilKunde.modal';

@Component({
  templateUrl: './kunde.component.html'
})

export class KundeComponent implements OnInit {
  alleKunder: Array<Kunde> = [];
  laster: boolean

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService) { }

  ngOnInit() {
    this.nav.show()
    this.laster = true;
    this.hentAlleKunder();
  }

  hentAlleKunder() {
    this._http.get<Kunde[]>('/api/admin/kunder').subscribe(
      (kundene) => {
        this.alleKunder = kundene;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreKunde(id: number) { }

  leggTilKunde() {
    const modalRef = this.modalService.open(LeggTilKundeModal, {
      backdrop: 'static', keyboard: false
    });

    modalRef.result.then((retur) => {
      if (retur == "Vellykket")
      this.hentAlleKunder();
    });
  
   }

  visModalOgSlett(id: number) { }

}
