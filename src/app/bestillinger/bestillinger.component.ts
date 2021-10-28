import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bestilling } from '../models/bestilling';
import { NavbarService } from '../nav-meny/nav-meny.service';

@Component({
  templateUrl: './bestillinger.component.html',
})
export class BestillingerComponent implements OnInit {
  alleBestillinger: Array<Bestilling> = [];
  laster: boolean = false;

  constructor(private http: HttpClient, private modalService: NgbModal, public nav: NavbarService) { }

  ngOnInit() {
    this.laster = true;
    this.hentAlleBestillinger();
    this.nav.show();
  }

  hentAlleBestillinger() {
    this.http
      //Endre til nytt endepunkt som henter alle ferder uten ruteid.
      .get<Bestilling[]>('/api/admin/bestillinger')
      .subscribe(
        (bestillinger) => {
          this.alleBestillinger = bestillinger;
          this.laster = false;
        },
        (error) => console.log(error)
      );
  }

  endreBestilling(id: number) { }

  slettBestilling(id: number) { }

  visBilletter(id: number) { }

  leggTilBestilling() { }
}
