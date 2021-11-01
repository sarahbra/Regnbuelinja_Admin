import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bestilling } from '../models/bestilling';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { BekreftSlettModal } from '../modals/slett-modaler/bekreft-slett.modal';
import { SlettErrorModal } from '../modals/slett-modaler/slett-error.modal';

@Component({
  templateUrl: './bestillinger.component.html',
})
export class BestillingerComponent implements OnInit {
  alleBestillinger: Array<Bestilling> = [];
  laster: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService
  ) {}

  ngOnInit() {
    this.laster = true;
    this.hentAlleBestillinger();
    this.nav.show();
  }

  hentAlleBestillinger() {
    this._http.get<Bestilling[]>('/api/admin/bestillinger').subscribe(
      (bestillinger) => {
        this.alleBestillinger = bestillinger;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreBestilling(id: number) {}

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(BekreftSlettModal, {
      backdrop: 'static',
      keyboard: false,
    });
    let textBody: string = 'Vil du slette bestilling med id ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/bestilling/' + id).subscribe(
          () => {
            this.hentAlleBestillinger();
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
      this._router.navigate(['/bestillinger']);
    });
  }

  visBilletter(id: number) {}

  leggTilBestilling() {}
}
