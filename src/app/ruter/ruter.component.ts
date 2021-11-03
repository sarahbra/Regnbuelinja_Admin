import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rute } from '../models/rute';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';
import { AlertModal } from '../modals/alert.modal';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { BillettModal } from '../modals/billett.modal';
import { LeggTilRuteModal } from './legg_tilRute.modal';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør
  templateUrl: './ruter.component.html',
  //styleUrls: ['./ruter.css'],
})
export class RuterComponent implements OnInit {
  alleRuter: Array<Rute> = [];
  laster: boolean = false;

  //Id fra rute, ferd, båt eller bestilling
  dataPassToChild: number = 0;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService
  ) {}

  ngOnInit() {
    this.nav.show();
    this.laster = true;
    this.hentAlleRuter();
  }

  hentAlleRuter() {
    this._http.get<Rute[]>('/api/admin/ruter').subscribe(
      (rutene) => {
        this.alleRuter = rutene;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreRute(id: number) {}

  leggTilRute() {
    const modalRef = this.modalService.open(LeggTilRuteModal, {
      backdrop: 'static', keyboard: false
    });

    modalRef.result.then((retur) => {
      if (retur == "Vellykket")
      this.hentAlleRuter();
    });
  }

  visModalOgSlett(id: number) {
    
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string = 'Vil du slette Rute ' + id + '?';
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then((retur) => {
      
      if (retur == 'Slett') {
        this._http.delete('/api/admin/rute/' + id).subscribe(
          () => {
            this.hentAlleRuter();
          },
          //Lage en kulere alert dialog?
          (res) => {
            const modalRef = this.modalService.open(AlertModal, {
              backdrop: 'static',
              keyboard: false,
            });
            let textBody: string = res.error;
            modalRef.componentInstance.updateBody(textBody);
            //Modal for å vise billetter knyttet til rute hvis bruker klikker "Vis billetter"
            modalRef.result.then((retur) => {
              
              if (retur == 'Vis') {
                const modalRef = this.modalService.open(BillettModal, {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'lg',
                });
                let textBody: string =
                  'Billetter tilknyttet rute med id ' +
                  id +
                  '\nmå slettes før ruten kan slettes';
                modalRef.componentInstance.updateBody(textBody);
                (<BillettModal>modalRef.componentInstance).dataToTakeAsInput =
                  id;
              }
            });
          }
        );
      }
      this._router.navigate(['/ruter']);
    });
  }
}
