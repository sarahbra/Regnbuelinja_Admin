import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Baat } from '../models/baat';
import { Router } from '@angular/router';
import { BekreftSlettModal } from '../modals/bekreft-slett.modal';
import { AlertAvhengigheterFinnesModal } from '../modals/alert-avhengigheter-finnes.modal';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { VisAvhengigheterModal } from '../modals/vis-avhengigheter.modal';

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
  ) {}

  ngOnInit() {
    this.nav.show();
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
    const modalRef = this.modalService.open(BekreftSlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette båt ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('/api/admin/baat/' + id).subscribe(
          () => {
            this.hentAlleBaater();
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
            //Modal for å vise billetter knyttet til båt hvis bruker klikker "Vis billetter"
            modalRef.result.then((retur) => {
              console.log('Lukket med:' + retur);
              if (retur == 'Vis') {
                const modalRef = this.modalService.open(VisAvhengigheterModal, {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'lg',
                });
                let textBody: string =
                  'Billetter tilknyttet båt med id ' +
                  id +
                  '\nmå slettes før båten kan slettes';
                modalRef.componentInstance.updateBody(textBody);
                (<VisAvhengigheterModal>modalRef.componentInstance).idAsInput =
                  id;
                (<VisAvhengigheterModal>(
                  modalRef.componentInstance
                )).endepunktAsInput = 'baat';
              }
            });
          }
        );
      }
      this._router.navigate(['/baater']);
    });
  }

  endreBaat(id: number) {}

  slettBaat(id: number) {}

  leggTilBaat() {}
}
