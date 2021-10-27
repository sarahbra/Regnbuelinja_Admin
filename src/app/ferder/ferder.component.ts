import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ferd } from '../models/ferd';
import { SlettModal } from '../modals/slett.modal';
import { AlertModal } from '../modals/alert.modal';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør ingenting
  templateUrl: './ferder.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class FerderComponent implements OnInit {
  alleFerder: Array<Ferd> = [];
  laster: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal
  ) {}

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

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette Ferd ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/ferd/' + id).subscribe(
          () => {
            this.hentAlleFerder();
          },
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
      this._router.navigate(['/ferder']);
    });
  }

  leggTilFerd() {}
}
