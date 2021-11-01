import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Billett } from '../models/billett';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { AlertAvhengigheterFinnesModal } from '../modals/alert-avhengigheter-finnes.modal';

@Component({
  templateUrl: './billett.component.html',
})
export class BillettComponent implements OnInit {
  alleBilletter: Array<Billett> = [];
  laster: boolean;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService
  ) {}

  ngOnInit() {
    this.nav.show();
    this.laster = true;
    this.hentAllebilletter();
  }

  hentAllebilletter() {
    this._http.get<Billett[]>('/api/admin/billetter').subscribe(
      (billettene) => {
        this.alleBilletter = billettene;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreBillett(id: number) {}

  leggTilBillett() {}

  visModalOgSlett(id: number) {}
}
