import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Baat } from '../models/baat';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';
import { AlertModal } from '../modals/alert.modal';
import { NavbarService } from '../nav-meny/nav-meny.service';

@Component({
  templateUrl: './baater.component.html',
})
export class BaaterComponent implements OnInit {
  alleBaater: Array<Baat> = [];
  laster: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService
  ) { }

  ngOnInit() {
    this.nav.show()
    this.laster = true;
    this.hentAlleBaater();
  }

  hentAlleBaater() {
    //Endre til nytt endepunkt som henter alle båter.
    this._http.get<Baat[]>('/api/admin/baater').subscribe(
      (baater) => {
        this.alleBaater = baater;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette Båt ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/baat/' + id).subscribe(
          () => {
            this.hentAlleBaater();
          },
          //Lage en kulere alert dialog?
          (res) => {
            const modalRef = this.modalService.open(AlertModal, {
              backdrop: 'static',
              keyboard: false,
            });
            let textBody: string = res.error;
            modalRef.componentInstance.updateBody(textBody);
          }
        );
      }
      this._router.navigate(['/baater']);
    });
  }

  endreBaat(id: number) { }

  slettBaat(id: number) { }

  leggTilBaat() { }
}
