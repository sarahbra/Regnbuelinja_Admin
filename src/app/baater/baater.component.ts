import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Baat } from '../models/baat';
import { Ferd } from '../models/ferd';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør ingenting
  templateUrl: './baater.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class BaaterComponent implements OnInit {
  alleBaater: Array<Baat> = [];
  laster: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.laster = true;
    this.hentAlleBaater();
  }

  hentAlleBaater() {
    //Endre til nytt endepunkt som henter alle båter.
    this._http.get<Baat[]>('/api/Bestilling/HentAlleBaater').subscribe(
      (baater) => {
        this.alleBaater = baater;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreBaat(id: number) {}

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static',
      keyboard: false,
    });

    let textBody: string =
      'Båt med id ' + id + 'kan slettes. Vil du slette Båt ' + id + '?';

    this._http.get<Ferd[]>('/api/admin/ferder/' + id).subscribe(
      (ferdene) => {
        console.log(ferdene);
        console.log(ferdene.length);
        if (ferdene.length == 0) {
          modalRef.componentInstance.updateBody(textBody);
          textBody += 'Er du sikker ';
        } else {
          textBody =
            'Båt ' + id + ' kan ikke slettes. Den brukes av følgene ferd(er): ';
          console.log('looping');
          for (let i = 0; i < ferdene.length; i++) {
            if (i < ferdene.length - 1) {
              textBody += ferdene[i].id + ', ';
            } else {
              textBody += ferdene[i].id + '. ';
            }
          }

          //updated tsconfig.json
          textBody += 'Slett gjeldene ferder for å kunne slette båt ' + id;
          modalRef.componentInstance.updateBody(textBody);
        }
      },
      (error) => console.log(error)
    );

    modalRef.result.then((retur) => {
      console.log('Lukket med:' + retur);
      if (retur == 'Slett') {
        this._http.delete('api/admin/baat/slett/' + id).subscribe(
          (retur) => {
            this.hentAlleBaater();
          },
          (error) => console.log(error)
        );
      }
      this._router.navigate(['/baater']);
    });
  }

  leggTilBaat() {}
}
