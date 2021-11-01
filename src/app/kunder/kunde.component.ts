import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Kunde } from '../models/kunde';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { BekreftSlettModal } from '../modals/bekreft-slett.modal';
import { SlettErrorModal } from '../modals/slett-error.modal';

@Component({
  templateUrl: './kunde.component.html',
})
export class KundeComponent implements OnInit {
  alleKunder: Array<Kunde> = [];
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

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(BekreftSlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette kunde med id: ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/kunde/' + id).subscribe(
          () => {
            this.hentAlleKunder();
          },
          (res) => {
            const modalRef = this.modalService.open(SlettErrorModal, {
              backdrop: 'static',
              keyboard: false,
            });
            let textBody: string = res.error;
            modalRef.componentInstance.updateBody(textBody);
          }
        );
      }
      this._router.navigate(['/kunder']);
    });
  }

  endreKunde(id: number) {}

  leggTilKunde() {}
}
