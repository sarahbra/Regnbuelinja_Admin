import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rute } from '../models/rute';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør
  templateUrl: './ruter.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class RuterComponent implements OnInit {
  alleRuter: Array<Rute> = [];
  laster: boolean = false;

  constructor(private _http: HttpClient, private _router: Router, private modalService: NgbModal) {}

  ngOnInit() {
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

  slettRute(id: number) {}

  leggTilRute() {}

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static', keyboard: false
    });
    const textBody: string = "Ruten med id "+ id;
    //updated tsconfig.json
    console.log(textBody);
    modalRef.componentInstance.updateBody(textBody);

    modalRef.result.then(retur => {
        console.log('Lukket med:' + retur);
        if (retur == "Slett") {
          
          this._http.delete("api/admin/" + id)
            .subscribe(retur => {
              this.hentAlleRuter();
            },
              error => console.log(error)
            );
        }
        this._router.navigate(['/ruter']);
     });
  }


}
