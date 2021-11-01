import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Billett } from '../models/billett';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { AlertAvhengigheterFinnesModal } from '../modals/alert-avhengigheter-finnes.modal';
import { BekreftSlettModal } from '../modals/bekreft-slett.modal';
import { VisAvhengigheterModal } from '../modals/vis-avhengigheter.modal';
import { SlettErrorModal } from '../modals/slett-error.modal';

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

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(BekreftSlettModal, {
      backdrop: 'static',
      keyboard: false,
    });
    let textBody: string = 'Vil du slette billett med ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/billett/' + id).subscribe(
          () => {
            this.hentAllebilletter();
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
      this._router.navigate(['/billetter']);
    });
  }
}
