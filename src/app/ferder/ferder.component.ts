import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ferd } from '../models/ferd';
import { BekreftSlettModal } from '../modals/bekreft-slett.modal';
import { AlertAvhengigheterFinnesModal } from '../modals/alert-avhengigheter-finnes.modal';
import { Router } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { VisAvhengigheterModal } from '../modals/vis-avhengigheter.modal';

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
    private modalService: NgbModal,
    public nav: NavbarService
  ) {}

  ngOnInit() {
    this.nav.show();
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
    const modalRef = this.modalService.open(BekreftSlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette ferd ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/ferd/' + id).subscribe(
          () => {
            this.hentAlleFerder();
          },
          (res) => {
            const modalRef = this.modalService.open(
              AlertAvhengigheterFinnesModal,
              {
                backdrop: 'static',
                keyboard: false,
              }
            );
            let textBody: string = res.error;
            modalRef.componentInstance.updateBody(textBody);
            //Modal for å vise billetter knyttet til ferd hvis bruker klikker "Vis billetter"
            modalRef.result.then((retur) => {
              console.log('Lukket med:' + retur);
              if (retur == 'Vis') {
                const modalRef = this.modalService.open(VisAvhengigheterModal, {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'lg',
                });
                let textBody: string =
                  'Billetter tilknyttet ferd med id ' +
                  id +
                  '\nmå slettes før ferden kan slettes';
                modalRef.componentInstance.updateBody(textBody);
                (<VisAvhengigheterModal>modalRef.componentInstance).idAsInput =
                  id;
                (<VisAvhengigheterModal>(
                  modalRef.componentInstance
                )).endepunktAsInput = 'ferd';
              }
            });
          }
        );
      }
      this._router.navigate(['/ferder']);
    });
  }

  leggTilFerd() {}
}
